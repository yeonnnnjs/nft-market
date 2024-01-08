const checkAuth = (account: string | null) => {
    if (!account) {
        window.location.href = '/user/login';
    }
};
export default checkAuth;