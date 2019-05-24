import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { Input, Icon, Form, Button, Col, Alert, Typography } from 'antd';
import { connect } from 'react-redux';
import { handleSignIn } from '../actions/user';
import { PropTypes } from 'prop-types';
import { formResponsiveAttributes } from '../utils/utils';

class SignInForm extends Component {
    
    static propTypes = {
        handleSignIn: PropTypes.func,
        token: PropTypes.string
    }
    
    state = { email: '', password: '', error: null };

    componentDidMount() {
        document.title = 'Sign in';
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            await this.props.handleSignIn(this.state.email, this.state.password);
        } catch (err) {
            this.setState({
                error: err.error.response.data.error
            });
        }
    }

    render() {
        const { email, password, error } = this.state;
        const { token } = this.props;
        if (token) {
            return <Redirect to='/' />
        }

        let errorJsx = null;
        if (error) {
            errorJsx = <Alert message="Error" description={error} type="error" style={{ marginBottom: 16}} />
        }
        return (
            <Col {...formResponsiveAttributes} className="sign-in-form">
                <Typography.Title level={3}>Sign in</Typography.Title>
                {errorJsx}
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

const mapStateToProps = ({ user: { token, error } }) => ({ token, error });

const mapDispatchToProps = { handleSignIn };

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);