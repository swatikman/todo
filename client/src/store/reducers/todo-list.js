import { replaceElemInArray, getError } from '../utils/utils';
import { success, error } from 'redux-saga-requests';import { 
    FETCH_TASKS,
    SET_TASK_FILTER,
    TASK_SEARCH_CHANGE,
    UPDATE_TASK,
    ADD_TASK,
    REMOVE_TASK
 } from '../actions/todo-list';


const initialState = {
    filter: 'all',
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
                error: getError(action.error),
                tasks: []
            }
        case success(FETCH_TASKS):
            return {
                ...state,
                loading: false,
                error: '',
                tasks: action.data
            }
        case SET_TASK_FILTER:
            return {
                ...state,
                minorError: '',
                filter: action.filter,
            }
        case TASK_SEARCH_CHANGE:
            return {
                ...state,
                minorError: '',
                search: action.search,
            }
        case UPDATE_TASK: {
            const oldTask = state.tasks.find((task) => task._id === action.meta.task._id);
            const newTask = {
                ...oldTask,
                ...action.meta.task
            };
            const newTasks = replaceElemInArray(state.tasks, newTask, 
                    (item) => item._id === newTask._id);
            return {
                ...state,
                minorError: '',
                tasks: newTasks
            }
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
                minorError: getError(action.error)
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
                minorError: getError(action.error) 
            }
        case success(ADD_TASK): {
            return {
                ...state,
                minorError: '',
            }
        }
        case error(ADD_TASK):
            return {
                ...state,
                minorError: getError(action.error) 
            }
        default:
            return state;
    }
}


export default todoListReducer;