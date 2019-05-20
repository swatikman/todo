import TasksService from '../services/TasksService';

const tasksService = new TasksService();

export const FETCHING_TASKS = 'FETCHING_TASKS';
export const FETCHING_TASKS_SUCCESS = 'FETCHING_TASKS_SUCCESS';
export const FETCHING_TASKS_ERROR = 'FETCHING_TASKS_ERROR';
export const SET_TASK_FILTER = 'SET_TASK_FILTER';
export const TASK_SEARCH_CHANGE = 'TASK_SEARCH_CHANGE';
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASK_ERROR = 'ADD_TASK_ERROR';
export const REMOVE_TASK = 'REMOVE_TASK';
export const REMOVE_TASK_ERROR = 'REMOVE_TASK_ERROR';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR';

function addTask(task) {
    return { type: ADD_TASK, payload: task }
}

function addTaskError(error) {
    return { type: ADD_TASK_ERROR, payload: error }
}

function removeTask(task) {
    return { type: REMOVE_TASK, payload: task }
}

function removeTaskError(error) {
    return { type: REMOVE_TASK_ERROR, payload: error }
}

function fetchingTasks() {
    return { type: FETCHING_TASKS }
}

function fetchingTasksSuccess(tasks) {
    return { type: FETCHING_TASKS_SUCCESS, payload: tasks }
}

function fetchingTasksError(error) {
    return { type: FETCHING_TASKS_ERROR, payload: error }
}

export function handleFilterClick(filter) {
    return { type: SET_TASK_FILTER, payload: filter }
}

export function handleTaskSearch(search) {
    return { type: TASK_SEARCH_CHANGE, payload: search }
}

export function fetchingUpdateTaskSuccess(task) {
    return { type: UPDATE_TASK_SUCCESS, payload: task }
}

export function fetchingUpdateTaskError(error) {
    return { type: UPDATE_TASK_ERROR, payload: error }
}

export function handleAddTask(label) {
    return (dispatch) => {
        return tasksService.addTask(label)
            .then(({ data }) => {
                dispatch(addTask(data));
            }) 
            .catch(({ response }) => {
                dispatch(addTaskError(response.data));
            })
    }
}

export function handleUpdate(task) {
    return (dispatch) => {
        return tasksService.updateTask(task)
                .then(({ data }) => {
                    dispatch(fetchingUpdateTaskSuccess(data));
                })
                .catch(({ response }) => {
                    dispatch(fetchingUpdateTaskError(response.data));
                });
    }
}

export function handleFetchingTasks() {
    return (dispatch) => {
        dispatch(fetchingTasks())
        return tasksService.getMyTasks()
                .then(({ data }) => {
                    dispatch(fetchingTasksSuccess(data))
                })
                .catch(({ response}) => {
                    dispatch(fetchingTasksError(response.data))
                });
    }  
}


export function handleRemoveTask(_id) {
    return (dispatch) => {
        return tasksService.removeTask(_id)
                .then((res) => {
                    dispatch(removeTask(_id));
                })
                .catch(({ response }) => {
                    dispatch((removeTaskError(response.data)));
                });
    }  
}
