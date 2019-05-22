import { 
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
 } from '../actions/User';

const initialState = {
    token: localStorage.getItem("token"),
    firstname: localStorage.getItem("firstname"),
    lastname: localStorage.getItem("lastname"),
    email: localStorage.getItem("email"),
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            const user = action.response.data;
            return {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token: action.response.headers.token
            };
        case LOGIN_ERROR: {
            return state;
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