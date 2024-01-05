const checkAuth = (account: string) => {
    console.log(account);
    if (!account) {
        window.location.href = '/user/login';
    }
};
export default checkAuth;