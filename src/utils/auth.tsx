export const CheckAuth = () => {
    const account = document.cookie
        .split("; ")
        .find(row => row.startsWith("account="))
        ?.split("=")[1];
    if (!account) {
        window.location.href = '/user/login';
    }
    return null;
};
export default CheckAuth;