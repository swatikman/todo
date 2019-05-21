import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { Input, Form, Col, Button, Alert, Icon, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class RegisterForm extends Component {

    state = { 
        email: '', 
        password: '',
        firstname: '',
        lastname: '',
        success: null,
        error: null 
    };

    usersService = new UsersService();

    componentDidMount() {
        document.title = 'Register';
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { email, password, firstname, lastname } = this.state;
        const user = { email, password, firstname, lastname };
        try {
            const { data } = await this.usersService.register(user);
            this.setState({
                error: null,
                success: data.message,
                email: '', 
                password: '',
                firstname: '',
                lastname: '',
            });
        }
        catch (err) {
            this.setState({
                error: err.response.data.error
            })
        }
    }

    render() {
        const { token } = this.props;
        if (token) {
            return <Redirect to='/' />
        }

        const { email, password, firstname, 
                lastname, success, error } = this.state;
        let response = null;
        if (error) {
            response = <Alert message="Error" 
                            description={error} 
                            type="error" style={{ marginBottom: 16 }}/>
        } else if (success) {
            return (
                <Col span={6} offset={9} className="register-form">
                    <Alert message="Success" 
                            description={success} 
                            type="success" />
                </Col>
            )
        }
        return (
            <Col span={6} offset={9} className="register-form">
                <Typography.Title level={3}>Registration</Typography.Title>
                {response}
                <Form onSubmit={this.onSubmit}>
                    <Form.Item>
                        <Input 
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text" placeholder="Email"
                                name="email" 
                                value={email}
                                onChange={this.onChange} />
                    </Form.Item>
                    <Form.Item>
                        <Input 
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}                                
                                type="password" placeholder="Password"
                                name="password"
                                value={password}
                                onChange={this.onChange}  />
                    </Form.Item>
                    <Form.Item>
                        <Input 
                                prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}                                                        
                                type="text" placeholder="First name"
                                name="firstname"
                                value={firstname}
                                onChange={this.onChange}  />
                    </Form.Item>
                    <Form.Item>
                        <Input 
                                prefix={<Icon type="meh" style={{ color: 'rgba(0,0,0,.25)' }} />}                                                        
                                type="text" placeholder="Last name"
                                name="lastname"
                                value={lastname}
                                onChange={this.onChange}  />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Register</Button>
                </Form>
            </Col>
        )
    }
}

const mapStateToProps = ({ user: { token } }) => ({ token });

export default connect(mapStateToProps)(RegisterForm);