export const getContractAddress = (currency: string): string => {
    switch (currency) {
      case 'ETH':
        return process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || "0x25b9e208a7077f18ffb69364cbb150606c3d5a50";
      case 'BFC':
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0x3a19cfec751e1ac53b034f430003c7e94a208fcf";
      default:
        return '';
    }
  };
  