import todoListReducer from './TodoList';
import user from './User';
import { combineReducers } from 'redux'

export default combineReducers({
    todoListReducer,
    user
});
