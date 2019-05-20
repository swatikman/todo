import axios from 'axios';
import { getToken } from './LocalStorage';

export default class TasksService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000/api/tasks'
    }

    getMyTasks() {
        return axios.get(`${this.BASE_URL}`, { headers: this.getHeaders() })
    }
    
    addTask(label) {
        return axios.post(`${this.BASE_URL}`,
                { label },
                { headers: this.getHeaders() });
    }

    removeTask(id) {
        return axios.delete(`${this.BASE_URL}/${id}`,
            { headers: this.getHeaders() });
    }

    updateTask(task) {
        return axios.put(`${this.BASE_URL}/${task._id}`,
            task,
            { headers: this.getHeaders() });
    }
    
    getHeaders() {
        return {
            "token": getToken()
        }
    }
}