import React, { Component } from 'react'
import UsersService from '../services/UsersService';
import { saveUser, isAuthenticated } from '../services/LocalStorage';
import { Link } from 'react-router-dom';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { email: 'abc@gmail.com', password: '123456', error: null };

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
        this.usersService.login(this.state.email, this.state.password)
            .then(({ data, headers }) => {
                
                saveUser(headers['token'], data);
                
                this.setState({
                    error: null
                });    
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.error
                })
            });
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div>
                <span>{error}</span>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Email"
                            name="email" 
                            value={email}
                            onChange={this.onChange} />
                    <input type="password" placeholder="Password"
                            name="password"
                            value={password}
                            onChange={this.onChange}  />
                    <input type="submit" />
                </form>
                <Link to='/password_reset' >Forgot password?</Link>
            </div>
            
        )
    }
}   