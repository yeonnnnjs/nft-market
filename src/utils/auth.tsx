const checkAuth = (account: string) => {
    if (!account) {
        window.location.href = '/user/login';
    }
};
export default checkAuth;