import { 
    FETCHING_TASKS,
    FETCHING_TASKS_SUCCESS,
    FETCHING_TASKS_ERROR,
    SET_TASK_FILTER,
    TASK_SEARCH_CHANGE,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_ERROR
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
        }
    }
    switch (action.type) {
        case FETCHING_TASKS:
            return {
                filter: state.filter,
                search: state.search,
                loading: true,
                error: false,
                tasks: state.tasks
            }
        case FETCHING_TASKS_ERROR:
            return {
                filter: state.filter,
                search: state.search,
                loading: false,
                error: action.payload,
                tasks: []
            }
        case FETCHING_TASKS_SUCCESS:
            return {
                filter: state.filter,
                search: state.search,
                loading: false,
                error: false,
                tasks: action.payload
            }
        case SET_TASK_FILTER:
            return {
                filter: action.payload,
                search: state.search,
                loading: state.loading,
                error: state.error,
                tasks: state.tasks
            }
        case TASK_SEARCH_CHANGE:
            return {
                filter: state.filter,
                search: action.payload,
                loading: state.loading,
                error: state.error,
                tasks: state.tasks
            }
        case UPDATE_TASK_SUCCESS:
            let newTasks = replaceElemInArray(state.tasks, action.payload, 
                (item) => item._id === action.payload._id);
            return {
                filter: state.filter,
                search: state.search,
                loading: state.loading,
                error: state.error,
                tasks: newTasks
            }
        case UPDATE_TASK_ERROR:
            newTasks = replaceElemInArray(state.tasks, action.payload, 
                (item) => item._id === action.payload._id);
            return {
                filter: state.filter,
                search: state.search,
                loading: state.loading,
                error: state.error,
                tasks: newTasks
            }
        case 'ADD_TASK':
        case 'REMOVE_TASK':
        case 'EDIT_TASK':
        case 'SET_ALL_TASKS':
        default:
            return state.tasks;
    }
}

export default todoListReducer;