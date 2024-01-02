export class Chain {
  chainID: number;
  currency: string;
  name: string;

  constructor(chainID: number, currency: string, name: string) {
    this.chainID = chainID;
    this.currency = currency;
    this.name = name;
  }
}

export const chainList: Chain[] = [
  new Chain(5, "ETH", 'Goerli Testnet'),
  new Chain(49088, "BFC", 'Bifrost Testnet'),
];

export const getChainInfo = (chainId: number): Chain | null => {
  const foundChain = chainList.find((chain) => chain.chainID === chainId);
  return foundChain || null;
};