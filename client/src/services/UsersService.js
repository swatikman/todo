import axios from 'axios';

export default class UsersService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000/api/users'
    }

    login(email, password) {
        return axios.post(`${this.BASE_URL}/login`, { email, password });
    }

    register(user) {
        return axios.post(`${this.BASE_URL}/register`, user);        
    }

    accountVerify(token) {
        return axios.post(`${this.BASE_URL}/register/${token}`);        
    }

    passwordReset(email) {
        return axios.post(`${this.BASE_URL}/password_reset`, { email });        
    }

    passwordResetNewPassword(resetToken, password) {
        return axios.post(`${this.BASE_URL}/password_reset/${resetToken}`, { password });        
    }
}