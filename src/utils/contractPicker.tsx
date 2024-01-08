export const getContractAddress = (currency: string | undefined): string => {
    switch (currency) {
      case 'ETH':
        return process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || "0x7c357b7663b6a741b62eb702d55acbeb9a922a2c";
      case 'BFC':
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xf280035fe74c2888e10277d21e39aaecf18655c5";
      default:
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xf280035fe74c2888e10277d21e39aaecf18655c5";
    }
  };
  