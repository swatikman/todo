import React, { Component } from 'react';
import LoginForm from './LoginForm';

export default class LoginPage extends Component {
    render() {
        return (
            <div>
                <LoginForm />
                <span>Register</span>
            </div>
        );
    }
}