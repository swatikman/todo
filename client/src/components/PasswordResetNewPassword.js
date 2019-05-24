import React, { Component } from 'react';
import { passwordResetNewPassword } from '../services/users-service';
import { Form, Input, Button, Alert, Col, Typography } from 'antd';
import { formResponsiveAttributes } from '../utils/utils';

export default class PasswordResetNewPassword extends Component {
    
    state = { 
        password1: '', 
        password2: '',
        success: '',
        error: ''
    };

    componentDidMount() {
        document.title = 'Password reset';
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }
    
    onSubmit = async (e) => {
        e.preventDefault();
        const { password1, password2 } = this.state;
        if (password1 !== password2) {
            this.setState({
                error: 'Passwords should be same'
            });
            return;
        }
        const token = this.props.match.params.token;
        try {
            await passwordResetNewPassword(token, password1);
            this.setState({
                success: 'You can now login with new password',
                error: ''
            });
        } catch (err) {
            this.setState({
                success: '',
                error: err.response.data.error
            });
        }
    }

    render() {
        const { password1, password2, error, success } = this.state;
        let content = null;
        let errorJsx = null;
        if (error) {
            errorJsx =  <Alert message={error} type="error" style={{ marginBottom: 16}}/>
        }
        if (success) {
            content =  <Alert message={success} type="success" />
        } else {
            content = (
                <Form onSubmit={this.onSubmit}>
                    <Typography.Title level={3} >
                        Type your new password
                    </Typography.Title>
                    {errorJsx}
                    <Form.Item>
                        <Input type="password" name="password1" 
                            onChange={this.onChange}
                            placeholder="Password"
                            value={password1}
                            />
                    </Form.Item>
                    <Form.Item>
                        <Input type="password" name="password2" 
                            onChange={this.onChange}
                            placeholder="Re-enter password"
                            value={password2}
                            />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Confirm</Button>
                </Form>
            )
        }
        return (
            <Col {...formResponsiveAttributes} className="password-reset-form2">
                {content}
            </Col>
        )
    }
}