import React, { useEffect } from 'react';
import MintNFTForm from '../src/components/MintNFTForm';
import Error from '@/src/components/Error';
import AllNFTs from '@/src/components/AllNFTs';
import MyPage from '@/src/components/MyPage';
import { useErrorContext } from '@/src/context/ErrorContext';
import { useAccount } from '@/src/context/AccountContext';

interface MainContentProps {
  selectedMenuItem: string;
}

const Main: React.FC<MainContentProps> = ({ selectedMenuItem }) => {
  const { errorMsg, setErrorMsg } = useErrorContext();
  const { account } = useAccount();

  useEffect(() => {
    if(!account) {
      setErrorMsg("로그인이 필요합니다!");
    } else {
      setErrorMsg(null);
    }
  }, [])

  return (
    <>
      {errorMsg ? (
        <Error />
      ) : (
        <>
          {selectedMenuItem === 'AllNFTs' && <AllNFTs />}
          {selectedMenuItem === 'MintNFT' && <MintNFTForm />}
          {selectedMenuItem === 'MyPage' && <MyPage />}
        </>
      )}
    </>
  );
};

export default Main;
