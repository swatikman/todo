import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import { requestsPromiseMiddleware } from 'redux-saga-requests';
import sagas from './sagas';
import saveUserMiddleware from './middleware/save-user-middleware';

const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(
    thunk, 
    requestsPromiseMiddleware({ auto: true }), 
    sagaMiddleware,
    saveUserMiddleware);

const store = createStore(reducers, middlewares);

sagaMiddleware.run(sagas);

export default store;