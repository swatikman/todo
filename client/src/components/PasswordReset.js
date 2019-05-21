
import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { Input, Form, Button, Col, Alert } from 'antd';

export default class PasswordReset extends Component {

    state = { email: '', success: '' };
    
    usersService = new UsersService();

    componentDidMount() {
        document.title = 'Password reset';
    }

    onChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await this.usersService.passwordReset(this.state.email);
            this.setState({
                response: data.message,
                email: ''
            })
        } catch (err) {
            this.setState({
                response: err.response.data.error
            });
        }
    }

    render() {
        const { response, email } = this.state
        let responseJsx = null;
        if (response) {
            responseJsx = <Alert message={response} type="warning" />;
        } 
        return (
            <Col span={6} offset={9} className="password-reset-form">
                <Form onSubmit={this.onSubmit} >
                    {responseJsx}
                    Enter your email to reset password
                    <Input type="text" name="email" 
                            value={email}
                            placeholder="Email"
                            onChange={this.onChange} />
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            </Col>
            
        );
    }
}