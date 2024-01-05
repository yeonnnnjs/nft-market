export class Chain {
  chainID: number;
  currency: string;
  name: string;
  rpcUrl: string;

  constructor(chainID: number, currency: string, name: string, rpcUrl: string) {
    this.chainID = chainID;
    this.currency = currency;
    this.name = name;
    this.rpcUrl = rpcUrl;
  }
}

export const chainList: Chain[] = [
  new Chain(5, "ETH", 'Goerli Testnet', 'https://ethereum-goerli.publicnode.com'),
  new Chain(49088, "BFC", 'Bifrost Testnet', 'https://public-01.testnet.bifrostnetwork.com/rpc'),
];

export const getChainInfo = (chainId: number): Chain | null => {
  const foundChain = chainList.find((chain) => chain.chainID === chainId);
  return foundChain || null;
};

export const getChainInfoByCurrency = (currency: string): Chain | null => {
  const foundChain = chainList.find((chain) => chain.currency === currency.toUpperCase());
  return foundChain || null;
};