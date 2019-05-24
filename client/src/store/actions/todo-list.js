import { LOGOUT } from './user';
import { getToken } from '../../utils/localstorage'

export const FETCH_TASKS = 'FETCH_TASKS';
export const SET_TASK_FILTER = 'SET_TASK_FILTER';
export const TASK_SEARCH_CHANGE = 'TASK_SEARCH_CHANGE';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const fetchTasks = () => ({
    type: FETCH_TASKS,
    request: {
        url: '/tasks',
        headers: {
            token: getToken()
        }
    },
    meta: {
      abortOn: LOGOUT
    },
});

export const fetchUpdateTask = (task) => ({
    type: UPDATE_TASK,
    request: {
        method: 'PUT',
        url: `/tasks/${task._id}`,
        data: task,
        headers: {
            token: getToken()
        }
    },
    meta: {
        abortOn: LOGOUT
    }
});

export const fetchAddTask = (task) => ({
    type: ADD_TASK,
    request: {
        method: 'POST',
        url: '/tasks',
        data: task,
        headers: {
            token: getToken()
        }
    },
    meta: {
        abortOn: LOGOUT
    }
});

export const fetchRemoveTask = (_id) => ({
    type: REMOVE_TASK,
    request: {
        method: 'DELETE',
        url: `/tasks/${_id}`,
        headers: {
            token: getToken()
        }
    },
    meta: {
        abortOn: LOGOUT,
        _id
    }
});

export function handleFilterClick(filter) {
    return { type: SET_TASK_FILTER, payload: filter }
}

export function handleTaskSearch(search) {
    return { type: TASK_SEARCH_CHANGE, payload: search }
}