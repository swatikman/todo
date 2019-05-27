import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import sagas from './sagas';
import saveUserMiddleware from './middleware/save-user-middleware';
import { getToken } from './utils/localstorage';

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(
    thunk, 
    requestsPromiseMiddleware({ auto: true }), 
    sagaMiddleware,
    saveUserMiddleware);

const userInitialState = {
    token: getToken() 
};

const initialState = {
    user: userInitialState
};

const store = createStore(reducers, initialState, middlewares);

sagaMiddleware.run(sagas);

export default store;