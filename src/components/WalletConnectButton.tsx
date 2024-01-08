import { useState } from 'react';
import { useAccount } from '../context/AccountContext';
import 'tailwindcss/tailwind.css';

const WalletConnectButton = () => {
  const { account, chainInfo, balance, connectWallet, disconnectWallet } = useAccount();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    disconnectWallet();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div>
      {account ? (
        <div className='flex'>
          <div>
            <p className="mr-2 text-white">{balance?.substring(0, 6)}{chainInfo?.currency}</p>
            <p className="mr-2 text-white">{account.substring(0, 6) + '.....' + account.substring(account.length - 6)}</p>
          </div>
          <button
            className="bg-white text-blue-500 px-2 py-1 rounded cursor-pointer hover:text-gray-300"
            onClick={handleLogoutClick}
          >
            로그아웃
          </button>

          {isLogoutModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-4 rounded">
                <p className="text-gray-800">로그아웃 하시겠습니까?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer mr-2 hover:bg-blue-600"
                    onClick={handleLogoutConfirm}
                  >
                    확인
                  </button>
                  <button
                    className="bg-gray-300 text-gray-800 px-2 py-1 rounded cursor-pointer hover:bg-gray-400"
                    onClick={handleCancelLogout}
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-white text-blue-500 px-2 py-1 rounded cursor-pointer hover:text-gray-300"
          onClick={connectWallet}
        >
          로그인(MetaMask)
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
