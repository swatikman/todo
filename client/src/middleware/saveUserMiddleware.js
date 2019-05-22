import { LOGIN_SUCCESS } from '../actions/User';
import { saveUser } from '../services/LocalStorage';

const saveUserMiddleware = store => next => action => {
    if (action.type === LOGIN_SUCCESS) {
        saveUser(action.response.headers.token, action.data);        
    }
    next(action);
};

export default saveUserMiddleware;
