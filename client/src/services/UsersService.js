import axios from 'axios';

export default class UsersService {
    
    constructor() {
        this.BASE_URL = 'http://localhost:3000'
    }

    login(email, password) {
        return axios.post(`${this.BASE_URL}/users/login`, { email, password });
    }

    register(user) {
        return axios.post(`${this.BASE_URL}/users/register`, user);        
    }

    accountVerify(token) {
        return axios.post(`${this.BASE_URL}/users/register/${token}`);        
    }

    passwordReset(email) {
        return axios.post(`${this.BASE_URL}/users/password_reset`, { email });        
    }

    passwordResetNewPassword(resetToken, password) {
        return axios.post(`${this.BASE_URL}/users/password_reset/${resetToken}`, { password });        
    }
}