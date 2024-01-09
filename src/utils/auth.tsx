import { useRouter } from "next/router";

export const CheckAuth = () => {
    const router = useRouter();
    const account = localStorage.getItem('account');
    if (!account) {
        router.push('/user/login');
    }
    return null;
};
export default CheckAuth;