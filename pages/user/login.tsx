import { useEffect } from "react";
import { useAccount } from "@/src/context/AccountContext";
import { useRouter } from "next/router";

const RequestLogin = () => {
    const { connectWallet, account } = useAccount();
    const router = useRouter();

    useEffect(() => {
        if (account) {
            router.back();
        }
    })

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-4">로그인이 필요합니다.</h1>
            <p className="text-gray-600 mb-8">
                서비스 사용을 위해 전자지갑이 필요합니다.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={connectWallet}
            >
                로그인
            </button>
        </div>
    );
};

export default RequestLogin;
