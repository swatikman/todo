import React, { Component } from 'react';
import { passwordReset } from '../services/users-service';
import { Input, Form, Button, Col, Alert, Typography, Spin } from 'antd';
import { emailRegexp, formResponsiveAttributes } from '../utils/utils';

class PasswordReset extends Component {

    state = { email: '', success: '', error: '', loading: '' };
    
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
        const { email } = this.state;
        if (!email.match(emailRegexp)) {
            this.setState({
                error: 'Please enter valid email!'
            });
            return;
        }        
        this.setState({
            loading: true
        })
        try {
            const { data } = await passwordReset(email);
            this.setState({
                success: data.message,
                email: '',
                loading: false
            })
        } catch (err) {
            this.setState({
                error: err.response.data.error,
                loading: false
            });
        }
    }

    render() {
        const { success, error, email, loading } = this.state;
        let content = null;
        if (success) {
            content = <Alert message="Success" description={success} type="success" />;
        } else {
            content = (
                <Spin spinning={loading}>
                    <Form onSubmit={this.onSubmit} >
                        <Typography.Paragraph strong>Enter your email to reset password</Typography.Paragraph>
                        { error ? <Alert message={error} type="error" style={{ marginBottom: 16}}/> : ''}
                        <Input type="text" name="email" 
                            value={email}
                            placeholder="Email"
                            onChange={this.onChange} />
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form>
                </Spin>
                
            )
        }
        return (
            <Col {...formResponsiveAttributes} className="password-reset-form">
                {content}
            </Col>
        );
    }
}

export default PasswordReset;