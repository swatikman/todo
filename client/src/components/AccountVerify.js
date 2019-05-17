import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { withRouter, Link } from 'react-router-dom'

class AccountVerify extends Component {
    
    constructor(props) {
        super(props);

        this.state = { response: '' };
        this.usersService = new UsersService();
    }

    componentDidMount() {
        const token = this.props.match.params.token;
        this.usersService.accountVerify(token)
            .then(({ data }) => {
                this.renderResponseAndRedirect(data.message);
            })
            .catch(err => {
                this.renderResponseAndRedirect('Token is invalid.');
            });
    }

    renderResponseAndRedirect(message) {
        this.setState({
            response: message
        });
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