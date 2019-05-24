import todoListReducer from './todo-list';
import user from './user';
import { combineReducers } from 'redux'

export default combineReducers({
    todoListReducer,
    user
});
