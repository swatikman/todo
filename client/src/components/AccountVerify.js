import React, { Component } from 'react';
import { accountVerify } from '../services/users-service';
import { withRouter, Link } from 'react-router-dom'
import { Col } from 'antd';

class AccountVerify extends Component {
    
    state = { response: '' };
    
    async componentDidMount() {
        const token = this.props.match.params.token;
        try {
            const { data } = await accountVerify(token);
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
        const attrs = {
            xs: {span: 18, offset: 3},
            sm: {span: 16, offset: 4},
            md: {span: 12, offset: 6},
            lg: {span: 8, offset: 8},
            xl: {span: 6, offset: 9} 
        }
        return (
            <Col {...attrs} className="account-verify">
                <h3>{this.state.response}</h3>
                <Link to='/sign-in'>To sign in page</Link>
            </Col>
        )
    }
}

export default withRouter(AccountVerify)