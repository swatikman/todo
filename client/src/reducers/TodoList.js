import { 
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_ERROR,
    SET_TASK_FILTER,
    TASK_SEARCH_CHANGE,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR,
    REMOVE_TASK,
    REMOVE_TASK_ERROR,
    ADD_TASK,
    ADD_TASK_ERROR
 } from '../actions/TodoList';
import { replaceElemInArray } from '../utils/utils';

const todoListReducer = (state, action) => {
    if (state === undefined) {
        return {
            filter: 'All',
            search: '',
            loading: false,
            error: false,
            tasks: [],
            minorError: ''
        }
    }
    switch (action.type) {
        case FETCHING_TASKS:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case FETCHING_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                minorError: '',
                error: action.payload,
                tasks: []
            }
        case FETCHING_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                minorError: '',
                tasks: action.payload
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
        case UPDATE_TASK_SUCCESS:
            let newTasks = replaceElemInArray(state.tasks, action.payload, 
                (item) => item._id === action.payload._id);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        case UPDATE_TASK_ERROR:
            return {
                ...state,
                minorError: action.payload
            }
        case REMOVE_TASK:
            newTasks = state.tasks.filter((task) => task._id !== action.payload );
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        case REMOVE_TASK_ERROR:
            return {
                ...state,
                minorError: action.payload
            }
        case ADD_TASK:
            newTasks = state.tasks.concat([action.payload]);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        case ADD_TASK_ERROR:
            return {
                ...state,
                minorError: action.payload 
            }
        default:
            return state;
    }
}

export default todoListReducer;