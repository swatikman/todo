import React, { Component } from 'react';
import { passwordReset } from '../services/UsersService';
import { Input, Form, Button, Col, Alert } from 'antd';

export default class PasswordReset extends Component {

    state = { email: '', success: '', error: '' };
    
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
            const { data } = await passwordReset(this.state.email);
            this.setState({
                success: data.message,
                email: ''
            })
        } catch (err) {
            this.setState({
                error: err.response.data.error
            });
        }
    }

    render() {
        const { success, error, email } = this.state
        let content = null;
        if (success) {
            content = <Alert message="Success" description={success} type="success" />;
        } else {
            content = (
                <Form onSubmit={this.onSubmit} >
                    { error ? <Alert message={error} type="error" /> : ''}
                    Enter your email to reset password
                    <Input type="text" name="email" 
                            value={email}
                            placeholder="Email"
                            onChange={this.onChange} />
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form>
            )
        }
        return (
            <Col span={6} offset={9} className="password-reset-form">
                {content}
            </Col>
        );
    }
}