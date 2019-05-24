import { replaceElemInArray } from '../../utils/utils';
import { success, error } from 'redux-saga-requests';import { 
    FETCH_TASKS,
    SET_TASK_FILTER,
    TASK_SEARCH_CHANGE,
    UPDATE_TASK,
    ADD_TASK,
    REMOVE_TASK
 } from '../actions/todo-list';


const initialState = {
    filter: 'All',
    search: '',
    loading: false,
    error: '',
    tasks: [],
    minorError: ''
}

const todoListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case error(FETCH_TASKS):
            return {
                ...state,
                loading: false,
                minorError: '',
                error: action.error.response.data.error,
                tasks: []
            }
        case success(FETCH_TASKS):
            return {
                ...state,
                loading: false,
                error: '',
                minorError: '',
                tasks: action.data
            }
        case SET_TASK_FILTER:
            return {
                ...state,
                minorError: '',
                filter: action.payload,
            }
        case TASK_SEARCH_CHANGE:
            return {
                ...state,
                minorError: '',
                search: action.payload,
            }
        case success(UPDATE_TASK): {
            const newTasks = replaceElemInArray(state.tasks, action.data, 
                (item) => item._id === action.data._id);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
        case error(UPDATE_TASK):
            return {
                ...state,
                minorError: action.error.response.data.error
            }
        case success(REMOVE_TASK): {
            const newTasks = state.tasks.filter((task) => task._id !== action.meta._id );
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
        case error(REMOVE_TASK):
            return {
                ...state,
                minorError: action.error.response.data.error 
            }
        case success(ADD_TASK): {
            const newTasks = state.tasks.concat([action.data]);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
        case error(ADD_TASK):
            return {
                ...state,
                minorError: action.error.response.data.error 
            }
        default:
            return state;
    }
}

export default todoListReducer;