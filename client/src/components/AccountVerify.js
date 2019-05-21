import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { withRouter, Link } from 'react-router-dom'

class AccountVerify extends Component {
    
    state = { response: '' };
    
    usersService = new UsersService();

    async componentDidMount() {
        const token = this.props.match.params.token;
        try {
            const { data } = await this.usersService.accountVerify(token);
            this.setState({
                response: data.message
            });
        } catch (err) {
            this.setState({
                response: 'Token is invalid.'
            });
        }
    }

    render() {
        if (!this.state.response) {
            return <span>Loading...</span>
        }
        return (
            <div>
                <h3>{this.state.response}</h3>
                <Link to='/login'>To login page</Link>
            </div>
        )
    }
}

export default withRouter(AccountVerify)