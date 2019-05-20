
import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { Input, Form, Button, Col } from 'antd';

export default class PasswordReset extends Component {
    
    constructor(props) {
        super(props);

        this.state = { email: '', success: '' };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService();
    }

    onChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.usersService.passwordReset(this.state.email)
            .then(({ data }) => {
                this.setState({
                    response: data.message,
                    email: ''
                })
            })
            .catch(err => {
                this.setState({
                    response: err.response.data.error
                })
            });
    }

    render() {
        const { response, email } = this.state
        const responseJsx = (response) ? <span>{response}</span> : '';
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