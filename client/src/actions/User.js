export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT'

export const handleLogin = (email, password) => ({
    type: LOGIN,
    request: {
        method: 'POST',
        url: '/users/login',
        data: { email, password }
    }
});


export function handleLogout() {
    localStorage.clear();
    return { type: LOGOUT };
}