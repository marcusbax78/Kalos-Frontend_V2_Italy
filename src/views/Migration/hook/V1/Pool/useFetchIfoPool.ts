import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import fetchIfoPoolUser from 'views/Migration/hook/V1/Pool/fetchIfoPoolUser'
import { fetchPublicIfoPoolData, fetchIfoPoolFeesData } from 'views/Migration/hook/V1/Pool/fetchIfoPoolPublic'
import { initialPoolVaultState } from 'state/pools/index'
import useSWR from 'swr'
import { fetchVaultFees } from 'state/pools/fetchVaultPublic'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from 'utils/providers'
import kalosVaultAbi from 'config/abi/xaloVault.json'
import { FAST_INTERVAL } from 'config/constants'
import { VaultKey } from 'state/types'
import { CHAIN_ID } from 'config/constants/networks'
import { fetchPublicVaultData } from './fetchPublicVaultData'

import KALOS_CONTRACT_LIST from '../../../../../config/constants/kalos-default.contracts.json'

const KalosVault = KALOS_CONTRACT_LIST.filter((contract) => contract.name === 'KalosVault/Automatic Pool' && contract.chainId === parseInt(CHAIN_ID))[0]

export const ifoPoolV1Contract = '0x1B2A2f6ed4A1401E8C73B4c2B6172455ce2f78E8'
export const kalosVaultAddress = KalosVault.address

const getKalosVaultContract = (signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new Contract(kalosVaultAddress, kalosVaultAbi, signerOrProvider) as any
}

const fetchVaultUserV1 = async (account: string) => {
  const contract = getKalosVaultContract()
  try {
    const userContractResponse = await contract.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      kalosAtLastUserAction: new BigNumber(userContractResponse.kalosAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      xaloAtLastUserAction: null,
    }
  }
}

const getIfoPoolData = async (account) => {
  const [ifoData, userData, feesData] = await Promise.all([
    fetchPublicIfoPoolData(ifoPoolV1Contract),
    fetchIfoPoolUser(account, ifoPoolV1Contract),
    fetchIfoPoolFeesData(ifoPoolV1Contract),
  ])
  const ifoPoolData = {
    ...ifoData,
    fees: { ...feesData },
    userData: { ...userData, isLoading: false },
  }
  return transformData(ifoPoolData)
}

const getXaloPoolData = async (account) => {
  const [vaultData, userData, feesData] = await Promise.all([
    fetchPublicVaultData(kalosVaultAddress),
    fetchVaultUserV1(account),
    fetchVaultFees(kalosVaultAddress),
  ])
  const xaloData = {
    ...vaultData,
    fees: { ...feesData },
    userData: { ...userData, isLoading: false },
  }
  return transformData(xaloData)
}

const transformData = ({
  totalShares,
  pricePerFullShare,
  totalXaloInVault,
  fees: { performanceFee, withdrawalFee, withdrawalFeePeriod },
  userData: { isLoading, userShares, xaloAtLastUserAction, lastDepositedTime, lastUserActionTime },
}) => {
  return {
    totalShares: new BigNumber(totalShares),
    pricePerFullShare: new BigNumber(pricePerFullShare),
    totalXaloInVault: new BigNumber(totalXaloInVault),
    fees: {
      performanceFeeAsDecimal: performanceFee && performanceFee / 100,
      performanceFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares: new BigNumber(userShares),
      xaloAtLastUserAction: new BigNumber(xaloAtLastUserAction),
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

export const useVaultPoolByKeyV1 = (key: VaultKey) => {
  const { account } = useWeb3React()
  const { data, mutate } = useSWR(
    account ? [key, 'v1'] : null,
    async () => {
      if (key === VaultKey.IfoPool) {
        return getIfoPoolData(account)
      }
      return getXaloPoolData(account)
    },
    {
      revalidateOnFocus: false,
      refreshInterval: FAST_INTERVAL,
      dedupingInterval: FAST_INTERVAL,
    },
  )

  return {
    vaultPoolData: data || initialPoolVaultState,
    fetchPoolData: mutate,
  }
}
