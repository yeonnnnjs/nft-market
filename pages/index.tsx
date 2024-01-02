import React from 'react';
import MintNFTForm from '../src/components/MintNFTForm';
import MyNFTs from '../src/components/MyNFTs';
import MyInfo from '@/src/components/MyInfo';
import Error from '@/src/components/Error';
import AllNFTs from '@/src/components/AllNFTs';
import { useErrorContext } from '@/src/context/ErrorContext';

interface MainContentProps {
  selectedMenuItem: string;
}

const Main: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
  const { errorMsg } = useErrorContext();

  return (
    <>
      {errorMsg ? (
        <Error />
      ) : (
        <>
        {selectedMenuItem === 'AllNFTs' && <AllNFTs />}
          {selectedMenuItem === 'MyInfo' && <MyInfo />}
          {selectedMenuItem === 'MyNFTs' && <MyNFTs />}
          {selectedMenuItem === 'MintNFT' && <MintNFTForm />}
        </>
      )}
    </>
  );
};

export default Main;
