import React, { Component } from 'react';
import UsersService from '../services/UsersService';

export default class PasswordResetNewPassword extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            password1: '', 
            password2: '',
            success: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService();
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }
    
    onSubmit(e) {
        
        e.preventDefault();
        const { password1, password2 } = this.state;
        if (password1 !== password2) {
            this.setState({
                error: 'Passwords should be same'
            });
            return;
        }

        const token = this.props.match.params.token;
        this.usersService.passwordResetNewPassword(token, password1)
                .then((res) => {
                    this.setState({
                        success: 'You can now login with new password',
                        error: ''
                    });
                })
                .catch(err => {
                    this.setState({
                        success: '',
                        error: err.response.data.error
                    });
                });
    }

    render() {
        const { password1, password2, error, success } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                {success}
                {error}
                <input type="password" name="password1" 
                    onChange={this.onChange}
                    placeholder="Password"
                    value={password1}
                    />
                <input type="password" name="password2" 
                    onChange={this.onChange}
                    placeholder="Re-enter password"
                    value={password2}
                    />
                <input type="submit" value="Confirm" />
            </form>
        )
    }
}