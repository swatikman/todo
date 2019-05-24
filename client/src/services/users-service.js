import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/account'

export const signIn = (email, password) => {
    return axios.post(`${baseUrl}/sign-in`, { email, password });
}

export const signUp = (data) => {
    return axios.post(`${baseUrl}/sign-up`, data);        
}

export const accountVerify = (token) => {
    return axios.post(`${baseUrl}/verify/${token}`);        
}

export const passwordReset = (email) => {
    return axios.post(`${baseUrl}/password-reset`, { email });        
}

export const passwordResetNewPassword = (resetToken, password) => {
    return axios.post(`${baseUrl}/password-reset/${resetToken}`, { password });        
}