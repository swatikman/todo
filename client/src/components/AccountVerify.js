import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { Col } from 'antd';
import { formResponsiveAttributes } from '../utils/utils';
import { connect } from 'react-redux';
import { handleAccountVerify } from '../store/actions/user';
import { PropTypes } from 'prop-types';

class AccountVerify extends Component {
    
    static propTypes = {
        handleAccountVerify: PropTypes.func
    }

    state = { response: '' };
    
    async componentDidMount() {
        const token = this.props.match.params.token;
        try {
            const { data } = await this.props.handleAccountVerify(token);
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
            <Col {...formResponsiveAttributes} className="account-verify">
                <h3>{this.state.response}</h3>
                <Link to='/sign-in'>To sign in page</Link>
            </Col>
        )
    }
}

const mapDispatchToProps = { handleAccountVerify };

export default connect(null, mapDispatchToProps)(
        withRouter(AccountVerify))