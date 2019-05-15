import React, { Component } from 'react'

export default class LoginForm extends Component {
    render() {
        return (
            <form >
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="submit" />
            </form>
        )
    }
}   