import { ChainId } from '@kalosdefi/sdk';
import { serializeTokens } from './tokens'
import { SerializedFarmConfig } from './types'
import { CHAIN_ID } from './networks'

import DEFAULT_TOKEN_LIST from './tokenLists/pancake-default.tokenlist.json';

const mainnetXaloToken = DEFAULT_TOKEN_LIST.tokens.filter((token) => token.name === 'Kalosdefi Token' && token.chainId === ChainId.MAINNET)[0]
const testnetXaloToken = DEFAULT_TOKEN_LIST.tokens.filter((token) => token.name === 'Kalosdefi Token' && token.chainId === ChainId.TESTNET)[0]

const serializedTokens = serializeTokens()

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'XALO LP',
    lpAddresses: {
      97: testnetXaloToken.address,
      56: mainnetXaloToken.address,
    },
    token: serializedTokens.xkalo,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 9,
    v1pid: 9,
    lpSymbol: 'XALO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x763CEE0ce3e74f90b1D51424aD1f8dBD6856d692',
    },
    token: serializedTokens.xalo,
    quoteToken: serializedTokens.wbnb,
    multiplier: '30X',
  },
  {
    pid: 1,
    v1pid: 1,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0x3ed8936cAFDF85cfDBa29Fbe5940A5b0524824F4',
      56: '0xb7758728a4838Ec79d1eD57a5bFC1517C3488983',
    },
    token: serializedTokens.cake,
    quoteToken: serializedTokens.wbnb,
    multiplier: '30X',
  },
  {
    pid: 2,
    v1pid: 2,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xB09E4A17A356642b2A47B2FAc7b3E5bCDbeb52ab',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.busd,
    multiplier: '30X',
  },
  {
    pid: 8,
    v1pid: 8,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x754FC573358953B78D7698B5B510fA446648A8AC', // 0xc188f34FA1217AE7da853986703b60A5DFDfb651' OLD FARM pid 3
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.busd,
    multiplier: '30X',
  },
  {
    pid: 4,
    v1pid: 4,
    lpSymbol: 'BTCB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xD6de0A64c07e44747347dD60De83fD13f8A49473',
    },
    token: serializedTokens.btcb,
    quoteToken: serializedTokens.busd,
    multiplier: '30X',
  },
  {
    pid: 5,
    v1pid: 5,
    lpSymbol: 'BNB-BTCB LP',
    lpAddresses: {
      97: '',
      56: '0x6fFc97A9518C8ACE48c9A63f22666cD788200F0a',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.btcb,
    multiplier: '30X',
  },
  {
    pid: 6,
    v1pid: 6,
    lpSymbol: 'BNB-DOGE LP',
    lpAddresses: {
      97: '',
      56: '0x39f21Ece3c1832Aa909fc6a42C3b111747da44D2',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.doge,
    multiplier: '30X',
  },
  {
    pid: 10,
    v1pid: 10,
    lpSymbol: 'BNB-SHIBA LP',
    lpAddresses: {
      97: '',
      56: '0x18F1311F5eca9b8239335fE9732Dd766722Dd5a6',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.shib,
    multiplier: '15X',
  },

  {
    pid: 7,
    v1pid: 7,
    lpSymbol: 'BNB-MBOX LP',
    lpAddresses: {
      97: '',
      56: '0x6bB21C0b162180a51673235C60667a0c4340f41d',
    },
    token: serializedTokens.wbnb,
    quoteToken: serializedTokens.mbox,
    multiplier: '30X',
  }
  
].filter((f) => !!f.lpAddresses[CHAIN_ID])

export default farms
