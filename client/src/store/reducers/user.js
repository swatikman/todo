import { 
    SIGN_IN,
    LOGOUT
 } from '../actions/user';
import { success } from 'redux-saga-requests';

const initialState = {
    token: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case success(SIGN_IN):
            return {
                token: action.response.headers.token
            };
        case LOGOUT:
            return {
                token: ''
            };
        default:
            return state;
    }
}

export default user;