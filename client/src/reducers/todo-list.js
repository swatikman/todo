import { 
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_ERROR,
    SET_TASK_FILTER,
    TASK_SEARCH_CHANGE,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR,
    REMOVE_TASK_SUCCESS,
    REMOVE_TASK_ERROR,
    ADD_TASK_SUCCESS,
    ADD_TASK_ERROR
 } from '../actions/todo-list';
import { replaceElemInArray } from '../utils/utils';


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
        case FETCHING_TASKS:
            return {
                ...state,
                loading: true,
                error: '',
            }
        case FETCHING_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                minorError: '',
                error: action.error.response.data.error,
                tasks: []
            }
        case FETCHING_TASKS_SUCCESS:
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
        case UPDATE_TASK_SUCCESS: {
            const newTasks = replaceElemInArray(state.tasks, action.data, 
                (item) => item._id === action.data._id);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
        case UPDATE_TASK_ERROR:
            return {
                ...state,
                minorError: action.error.response.data.error
            }
        case REMOVE_TASK_SUCCESS: {
            const newTasks = state.tasks.filter((task) => task._id !== action.meta._id );
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
            
        case REMOVE_TASK_ERROR:
            return {
                ...state,
                minorError: action.error.response.data.error 
            }
        case ADD_TASK_SUCCESS: {
            const newTasks = state.tasks.concat([action.data]);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
        }
        case ADD_TASK_ERROR:
            return {
                ...state,
                minorError: action.error.response.data.error 
            }
        default:
            return state;
    }
}

export default todoListReducer;