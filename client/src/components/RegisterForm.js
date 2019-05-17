import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { isAuthenticated } from './../services/LocalStorage'

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            email: '', 
            password: '',
            firstname: '',
            lastname: '',
            success: null,
            error: null };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService(); 
    }

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.history.push('/');
        }
    }

    onChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password, firstname, lastname } = this.state;
        const user = { email, password, firstname, lastname };
        this.usersService.register(user)
            .then(({ data }) => {
                
                this.setState({
                    error: null,
                    success: data.message,
                    email: '', 
                    password: '',
                    firstname: '',
                    lastname: '',
                });    
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.error
                })
            });
    }

    render() {
        const { email, password, firstname, 
                lastname, success, error } = this.state;
        
        return (
            <form onSubmit={this.onSubmit}>
                <span>{error}</span>
                <span>{success}</span>
                <input type="text" placeholder="Email"
                        name="email" 
                        value={email}
                        onChange={this.onChange} />
                <input type="password" placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}  />
                <input type="text" placeholder="First name"
                        name="firstname"
                        value={firstname}
                        onChange={this.onChange}  />
                <input type="text" placeholder="Last name"
                        name="lastname"
                        value={lastname}
                        onChange={this.onChange}  />
                <input type="submit" />
            </form>
        )
    }
}