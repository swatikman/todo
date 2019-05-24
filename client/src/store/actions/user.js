export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const ACCOUNT_VERIFY = 'ACCOUNT_VERIFY';
export const PASSWORD_RESET = 'PASSWORD_RESET';
export const PASSWORD_RESET_NEW_PASSWORD = 'PASSWORD_RESET_NEW_PASSWORD';
export const LOGOUT = 'LOGOUT'

export const handleSignIn = (email, password) => ({
    type: SIGN_IN,
    request: {
        method: 'POST',
        url: '/account/sign-in',
        data: { email, password }
    }
});

export const handleSignUp = (userData) => ({
    type: SIGN_UP,
    request: {
        method: 'POST',
        url: '/account/sign-up',
        data: userData
    }
});

export const handleAccountVerify = (token) => ({
    type: ACCOUNT_VERIFY,
    request: {
        method: 'POST',
        url: `/account/verify/${token}`,
        data: { token }
    }
});

export const handlePasswordReset = (email) => ({
    type: PASSWORD_RESET,
    request: {
        method: 'POST',
        url: '/account/password-reset',
        data: { email }
    }
});

export const handlePasswordResetNewPassword = (resetToken, password) => ({
    type: PASSWORD_RESET_NEW_PASSWORD,
    request: {
        method: 'POST',
        url: `/account/password-reset/${resetToken}`,
        data: { password }
    }
});

export const handleLogout = () => {
    localStorage.clear();
    return { type: LOGOUT };
}