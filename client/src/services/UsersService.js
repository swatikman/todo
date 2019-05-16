import axios from 'axios';

export default class UsersService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000'
    }

    login(email, password) {
        return axios.post(`${this.BASE_URL}/login`, { email, password });
    }

    register(user) {
        return axios.post(`${this.BASE_URL}/login`, user);        
    }

    passwordReset(email) {
        return axios.post(`${this.BASE_URL}/password_reset`, { email });        
    }
}