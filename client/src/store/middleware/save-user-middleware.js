import { SIGN_IN } from '../actions/user';
import { saveToken } from '../../utils/localstorage';
import { success } from 'redux-saga-requests';

const saveUserMiddleware = store => next => action => {
    if (action.type === success(SIGN_IN)) {
        saveToken(action.response.headers.token);        
    }
    next(action);
};

export default saveUserMiddleware;
