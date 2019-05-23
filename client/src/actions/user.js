export const SIGN_IN = 'SIGN_IN';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const LOGOUT = 'LOGOUT'

export const handleSignIn = (email, password) => ({
    type: SIGN_IN,
    request: {
        method: 'POST',
        url: '/account/sign-in',
        data: { email, password }
    }
});

export function handleLogout() {
    localStorage.clear();
    return { type: LOGOUT };
}