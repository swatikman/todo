import axios from 'axios';
import { getToken } from './LocalStorage';

export default class TasksService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000'
    }

    getMyTasks() {
        return axios.get(`${this.BASE_URL}/tasks`, { headers: this.getHeaders() })
    }
    
    addTask(label) {
        return axios.post(`${this.BASE_URL}/tasks`,
                { label },
                { headers: this.getHeaders() });
    }

    removeTask(id) {
        return axios.delete(`${this.BASE_URL}/tasks/${id}`,
            { headers: this.getHeaders() });
    }

    updateTask(task) {
        return axios.put(`${this.BASE_URL}/tasks/${task._id}`,
            task,
            { headers: this.getHeaders() });
    }
    
    getHeaders() {
        return {
            "token": getToken()
        }
    }
}