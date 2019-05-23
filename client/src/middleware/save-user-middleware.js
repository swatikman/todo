import { SIGN_IN_SUCCESS } from '../actions/user';
import { saveToken } from '../services/LocalStorage';

const saveUserMiddleware = store => next => action => {
    if (action.type === SIGN_IN_SUCCESS) {
        saveToken(action.response.headers.token);        
    }
    next(action);
};

export default saveUserMiddleware;
