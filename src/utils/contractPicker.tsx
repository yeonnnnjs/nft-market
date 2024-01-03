export const getContractAddress = (currency: string): string => {
    switch (currency) {
      case 'ETH':
        return process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || "0x25b9e208a7077f18ffb69364cbb150606c3d5a50";
      case 'BFC':
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xf280035fe74c2888e10277d21e39aaecf18655c5";
      default:
        return '';
    }
  };
  