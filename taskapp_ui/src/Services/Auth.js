const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user && user.token) {
        return true;
    }

    return false;
}

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'x-auth-token': user.token };
    }

    return {};
}

export default { getAuthUser, isAuthenticated, getAuthHeader };