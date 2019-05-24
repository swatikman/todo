import axios from 'axios';
import { createRequestInstance, watchRequests } from 'redux-saga-requests';
import { createDriver } from 'redux-saga-requests-axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export default function* rootSaga() {
    yield createRequestInstance({ driver: createDriver(axiosInstance) });
    yield watchRequests();
}