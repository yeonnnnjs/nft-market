export const CheckAuth = (account: string | null) => {
    console.log(account);
    if (!account) {
        window.location.href = '/user/login';
    }
    return null;
};
export default CheckAuth;