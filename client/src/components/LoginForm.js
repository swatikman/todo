import React, { Component } from 'react'
import UsersService from '../services/UsersService';
import { Link, Redirect } from 'react-router-dom';
import { Input, Icon, Form, Button, Col, Alert, Typography } from 'antd';
import { connect } from 'react-redux';
import { handleLogin } from './../actions/User'

class LoginForm extends Component {

    state = { email: '', password: '', error: null };

    usersService = new UsersService(); 

    componentDidMount() {
        document.title = 'Login';
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.email, this.state.password);
    }

    render() {
        const { email, password } = this.state;
        const { token, error } = this.props;
        if (token) {
            return <Redirect to='/' />
        }

        let errorJsx = null;
        if (error) {
            errorJsx = <Alert message="Error" description={error} type="error" />
        }
        return (
            <Col span={6} offset={9} className="login-form">
                <Typography.Title level={3}>Login</Typography.Title>
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
                    <Link to="/password_reset">
                        Forgot password
                    </Link>
                    <br />
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <br/>
                    Or <Link to="/register">register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
            
        )
    }
}   

const mapStateToProps = ({ user: { token, error } }) => ({ token, error });

const mapDispatchToProps = { handleLogin };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);