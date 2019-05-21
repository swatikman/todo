import UsersService from '../services/UsersService';

const usersService = new UsersService();

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT'


const loginSuccess = (user, token) => ({ type: LOGIN_SUCCESS, payload: { user, token }});

const loginError = (error) => ({ type: LOGIN_ERROR, payload: error });

export function handleLogin(email, password) {
    return async (dispatch) => {
        try {
            const { data, headers } = await usersService.login(email, password);
            dispatch(loginSuccess(data, headers['token']));
        } catch ({ response }) {
            dispatch(loginError(response.data));
        }
    
    }
}

export function handleLogout() {
    localStorage.clear();
    return { type: LOGOUT };
}