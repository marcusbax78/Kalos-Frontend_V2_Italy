import { ChainId, JSBI, Percent, Token } from '@kalosdefi/sdk'
import { BigNumber } from '@ethersproject/bignumber'
import { mainnetTokens, testnetTokens } from './tokens'
import { ChainTokenList } from './types'

import DEFAULT_TOKEN_LIST from './tokenLists/pancake-default.tokenlist.json';

import KALOS_CONTRACT_LIST from './kalos-default.contracts.json';
import { CHAIN_ID } from './networks';

const mainnetKalosRouter = KALOS_CONTRACT_LIST.filter((contract) => contract.name === 'KalosRouter' && contract.chainId === ChainId.MAINNET)[0]
const testnetKalosRouter = KALOS_CONTRACT_LIST.filter((contract) => contract.name === 'KalosRouter' && contract.chainId === ChainId.TESTNET)[0]
export const ROUTER_ADDRESS = {
  [ChainId.MAINNET]: mainnetKalosRouter.address,
  [ChainId.TESTNET]: testnetKalosRouter.address,
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.MAINNET]: [
    mainnetTokens.wbnb,
    mainnetTokens.cake,
    mainnetTokens.xalo,
    mainnetTokens.busd,
    mainnetTokens.usdt,
    mainnetTokens.btcb,
    mainnetTokens.eth,
    mainnetTokens.usdc,
  ],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
  [ChainId.LOCALNET]: []
}

/**
 * Additional bases for specific tokens
 * @example { [WBTC.address]: [renBTC], [renBTC.address]: [WBTC] }
 */
export const ADDITIONAL_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 * @example [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {},
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  [ChainId.MAINNET]: [mainnetTokens.busd, mainnetTokens.xalo, mainnetTokens.cake],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
  [ChainId.LOCALNET]: []
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.MAINNET]: [mainnetTokens.wbnb, mainnetTokens.dai, mainnetTokens.busd, mainnetTokens.usdt],
  [ChainId.TESTNET]: [testnetTokens.wbnb, testnetTokens.cake, testnetTokens.busd],
  [ChainId.LOCALNET]: []
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [mainnetTokens.xalo, mainnetTokens.wbnb],
    [mainnetTokens.cake, mainnetTokens.wbnb],
    [mainnetTokens.busd, mainnetTokens.usdt],
    [mainnetTokens.dai, mainnetTokens.usdt],
  ],
}

export const BIG_INT_ZERO = JSBI.BigInt(0)
export const BIG_INT_TEN = JSBI.BigInt(10)

// one basis point
export const BIPS_BASE = JSBI.BigInt(10000)
export const ONE_BIPS = new Percent(JSBI.BigInt(1), BIPS_BASE)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much BNB so they end up with <.01
export const MIN_BNB: JSBI = JSBI.exponentiate(BIG_INT_TEN, JSBI.BigInt(16)) // .01 BNB
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), BIPS_BASE)

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const BASE_FEE = new Percent(JSBI.BigInt(30), BIPS_BASE)
export const INPUT_FRACTION_AFTER_FEE = ONE_HUNDRED_PERCENT.subtract(BASE_FEE)

// BNB
export const DEFAULT_INPUT_CURRENCY = 'BNB'
// CAKE

const kalosToken = DEFAULT_TOKEN_LIST.tokens.filter((token) => token.name === 'Kalosdefi Token' && token.chainId === parseInt(CHAIN_ID))[0]
export const DEFAULT_OUTPUT_CURRENCY = kalosToken.address

// Handler string is passed to Gelato to use PCS router
export const GELATO_HANDLER = 'pancakeswap'
export const GENERIC_GAS_LIMIT_ORDER_EXECUTION = BigNumber.from(500000)

export const LIMIT_ORDERS_DOCS_URL = '*'
