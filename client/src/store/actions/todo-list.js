import { LOGOUT } from './user';
import { getToken } from '../utils/localstorage'

export const FETCH_TASKS = 'FETCH_TASKS';
export const SET_TASK_FILTER = 'SET_TASK_FILTER';
export const TASK_SEARCH_CHANGE = 'TASK_SEARCH_CHANGE';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';

export const handleFetchTasks = () => {
    return (dispatch, getState) => {
        const { filter, search } = getState().todoListReducer;
        return dispatch(fetchTasks({ filter, search }));
    }
};

const fetchTasks = (params) => ({
    type: FETCH_TASKS,
    request: {
        url: '/tasks',
        params: params,
        headers: {
            token: getToken()
        }
    },
    meta: {
      abortOn: LOGOUT
    },
});

export const handleUpdateTask = (task) => {
    return async (dispatch) => {
        await dispatch(fetchUpdateTask(task));
        await dispatch(handleFetchTasks());
    }
}

const fetchUpdateTask = (task) => ({
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
        abortOn: LOGOUT,
        task
    }
});

export const handleAddTask = (task) => {
    return async (dispatch) => {
        await dispatch(fetchAddTask(task));
        await dispatch(handleFetchTasks());
    }
}

const fetchAddTask = (task) => ({
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

export const handleRemoveTask = (_id) => {
    return async (dispatch) => {
        await dispatch(fetchRemoveTask(_id));
        await dispatch(handleFetchTasks());
    }
}

const fetchRemoveTask = (_id) => ({
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
    return (dispatch) => {
        dispatch({ type: SET_TASK_FILTER, filter });
        dispatch(handleFetchTasks());
    }
};

export function handleTaskSearch(search) {
    return (dispatch) => {
        dispatch({ type: TASK_SEARCH_CHANGE, search });
        dispatch(handleFetchTasks());
    }
};