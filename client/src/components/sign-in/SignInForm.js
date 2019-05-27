import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Input, Icon, Form, Button, Col, Alert, Typography } from 'antd';
import { connect } from 'react-redux';
import { handleSignIn } from '../../store/actions/user';
import { PropTypes } from 'prop-types';
import { formResponsiveAttributes } from '../../store/utils/utils';
import { Helmet } from 'react-helmet';
import { getError } from '../../store/utils/utils';

class SignInForm extends Component {
    
    static propTypes = {
        handleSignIn: PropTypes.func,
        token: PropTypes.string
    }
    
    state = { email: '', password: '', error: null };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            await this.props.handleSignIn(this.state.email, this.state.password);
        } catch (err) {
            this.setState({
                error: getError(err.error)
            });
        }
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <Col {...formResponsiveAttributes} className="sign-in-form">
                <Helmet>
                    <title>Sign in</title>
                </Helmet>
                <Typography.Title level={3}>Sign in</Typography.Title>
                {error && <Alert message="Error" description={error} type="error" style={{ marginBottom: 16}} />}
                <Form onSubmit={this.onSubmit}>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username" 
                            name="email"
                            value={email}
                            onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                    <Link to="/password-reset">
                        Forgot password
                    </Link>
                    <br />
                    <Button type="primary" htmlType="submit">
                        Sign in
                    </Button>
                    <br/>
                    Or <Link to="/sign-up">Sign up now!</Link>
                    </Form.Item>
                </Form>
            </Col>
            
        )
    }
}   

const mapDispatchToProps = { handleSignIn };

export default connect(null, mapDispatchToProps)(SignInForm);