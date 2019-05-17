

export const saveUser = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('firstname', user.firstname);
    localStorage.setItem('lastname', user.lastname);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const clearStorage = () => {
    localStorage.clear();
}

export const isAuthenticated = () => {
    return !!getToken()
}