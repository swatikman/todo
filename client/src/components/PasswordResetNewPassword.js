import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { Form, Input, Button, Alert, Col } from 'antd';

export default class PasswordResetNewPassword extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            password1: '', 
            password2: '',
            success: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService();
    }

    componentDidMount() {
        document.title = 'Password reset';
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value 
        });
    }
    
    onSubmit(e) {
        e.preventDefault();
        const { password1, password2 } = this.state;
        if (password1 !== password2) {
            this.setState({
                error: 'Passwords should be same'
            });
            return;
        }

        const token = this.props.match.params.token;
        this.usersService.passwordResetNewPassword(token, password1)
                .then((res) => {
                    this.setState({
                        success: 'You can now login with new password',
                        error: ''
                    });
                })
                .catch(err => {
                    this.setState({
                        success: '',
                        error: err.response.data.error
                    });
                });
    }

    render() {
        const { password1, password2, error, success } = this.state;
        let content = null;
        if (error) {
            content =  <Alert message={error} type="error" />
        } else if (success) {
            content =  <Alert message={success} type="success" />
        } else {
            content = (
                <Form onSubmit={this.onSubmit}>
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
            <Col span={6} offset={9} className="password-reset-form2">
                {content}
            </Col>
        )
    }
}