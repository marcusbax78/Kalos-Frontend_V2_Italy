import { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { batch, useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFastRefreshEffect, useSlowRefreshEffect } from 'hooks/useRefreshEffect'
import farmsConfig from 'config/constants/farms'
import { livePools } from 'config/constants/pools'

import {
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchKalosVaultPublicData,
  fetchKalosVaultUserData,
  fetchKalosVaultFees,
  fetchPoolsStakingLimitsAsync,
  fetchUserIfoCreditDataAsync,
  fetchIfoPublicDataAsync,
  fetchXaloFlexibleSideVaultPublicData,
  fetchXaloFlexibleSideVaultUserData,
  fetchXaloFlexibleSideVaultFees,
} from '.'
import { DeserializedPool, VaultKey } from '../types'
import { fetchFarmsPublicDataAsync } from '../farms'
import {
  makePoolWithUserDataLoadingSelector,
  makeVaultPoolByKey,
  poolsWithVaultSelector,
  ifoCreditSelector,
  ifoCeilingSelector,
  makeVaultPoolWithKeySelector,
} from './selectors'

const lPoolAddresses = livePools.filter(({ sousId }) => sousId !== 0).map(({ earningToken }) => earningToken.address)

// Only fetch farms for live pools
const activeFarms = farmsConfig
  .filter(
    ({ token, pid, quoteToken }) =>
      pid !== 0 &&
      ((token.symbol === 'BUSD' && quoteToken.symbol === 'WBNB') ||
        lPoolAddresses.find((poolAddress) => poolAddress === token.address)),
  )
  .map((farm) => farm.pid)

export const useFetchPublicPoolsData = () => {
  const dispatch = useAppDispatch()

  useSlowRefreshEffect(
    (currentBlock) => {
      const fetchPoolsDataWithFarms = async () => {
        await dispatch(fetchFarmsPublicDataAsync(activeFarms))

        batch(() => {
          dispatch(fetchPoolsPublicDataAsync(currentBlock))
          dispatch(fetchPoolsStakingLimitsAsync())
        })
      }

      fetchPoolsDataWithFarms()
    },
    [dispatch],
  )
}

export const usePool = (sousId: number): { pool: DeserializedPool; userDataLoaded: boolean } => {
  const poolWithUserDataLoadingSelector = useMemo(() => makePoolWithUserDataLoadingSelector(sousId), [sousId])
  return useSelector(poolWithUserDataLoadingSelector)
}

export const usePoolsWithVault = () => {
  return useSelector(poolsWithVaultSelector)
}

export const useDeserializedPoolByVaultKey = (vaultKey) => {
  const vaultPoolWithKeySelector = useMemo(() => makeVaultPoolWithKeySelector(vaultKey), [vaultKey])

  return useSelector(vaultPoolWithKeySelector)
}

export const usePoolsPageFetch = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()
  useFetchPublicPoolsData()

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchKalosVaultPublicData())
      dispatch(fetchXaloFlexibleSideVaultPublicData())
      dispatch(fetchIfoPublicDataAsync())
      if (account) {
        dispatch(fetchPoolsUserDataAsync(account))
        dispatch(fetchKalosVaultUserData({ account }))
        dispatch(fetchXaloFlexibleSideVaultUserData({ account }))
      }
    })
  }, [account, dispatch])

  useEffect(() => {
    batch(() => {
      dispatch(fetchKalosVaultFees())
      dispatch(fetchXaloFlexibleSideVaultFees())
    })
  }, [dispatch])
}

export const useFetchIfo = () => {
  const { account } = useWeb3React()
  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    batch(() => {
      dispatch(fetchKalosVaultPublicData())
      dispatch(fetchIfoPublicDataAsync())
      if (account) {
        dispatch(fetchPoolsUserDataAsync(account))
        dispatch(fetchKalosVaultUserData({ account }))
        dispatch(fetchUserIfoCreditDataAsync(account))
      }
    })
  }, [dispatch, account])

  useEffect(() => {
    dispatch(fetchKalosVaultFees())
  }, [dispatch])
}

export const useKalosVault = () => {
  return useVaultPoolByKey(VaultKey.KalosVault)
}

export const useVaultPoolByKey = (key: VaultKey) => {
  const vaultPoolByKey = useMemo(() => makeVaultPoolByKey(key), [key])

  return useSelector(vaultPoolByKey)
}

export const useIfoCredit = () => {
  return useSelector(ifoCreditSelector)
}

export const useIfoCeiling = () => {
  return useSelector(ifoCeilingSelector)
}
