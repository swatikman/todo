import { 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
 } from '../actions/User';

const initialState = {
    token: '',
    firstname: '',
    lastname: '',
    email: '',
    error: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const user = action.payload.user;
            return {
                error: '',
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: action.payload.token
            };
        case LOGIN_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case LOGOUT:
            return {
                token: '',
                firstname: '',
                lastname: '',
                email: '',
            }
        default:
            return state;
    }
}

export default user;