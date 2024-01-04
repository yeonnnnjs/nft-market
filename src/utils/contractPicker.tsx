export const getContractAddress = (currency: string | undefined): string => {
    switch (currency) {
      case 'ETH':
        return process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || "0x3a19cfec751e1ac53b034f430003c7e94a208fcf";
      case 'BFC':
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xf280035fe74c2888e10277d21e39aaecf18655c5";
      default:
        return '';
    }
  };
  