export const getContractAddress = (currency: string | undefined): string => {
    switch (currency) {
      case 'ETH':
        return process.env.NEXT_PUBLIC_ETH_CONTRACT_ADDRESS || "0x4d9be310abba0db366994c6e6744267c54dc1688";
      case 'BFC':
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xd519436746a8757b7e9e842714e1857286d7928d";
      default:
        return process.env.NEXT_PUBLIC_BFC_CONTRACT_ADDRESS || "0xd519436746a8757b7e9e842714e1857286d7928d";
    }
  };
  