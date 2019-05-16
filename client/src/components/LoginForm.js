import React, { Component } from 'react'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { email: '', password: '' };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <form>
                <input type="text" placeholder="Email"
                        name="email" 
                        value={this.state.email}
                        onChange={this.onChange} />
                <input type="password" placeholder="Password"
                        name="email"
                        value={this.state.password}
                        onChange={this.onChange}  />
                <input type="submit" />
            </form>
        )
    }
}   