import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
    LOGOUT
 } from '../actions/user';

const initialState = {
    token: localStorage.getItem("token")
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_SUCCESS:
            return {
                token: action.response.headers.token
            };
        case SIGN_IN_ERROR: {
            return state;
        }
        case LOGOUT:
            return {
                token: ''
            }
        default:
            return state;
    }
}

export default user;