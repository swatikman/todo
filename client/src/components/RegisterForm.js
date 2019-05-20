import React, { Component } from 'react';
import UsersService from '../services/UsersService';
import { isAuthenticated } from './../services/LocalStorage'
import { Input, Form, Col, Button, Alert, Icon } from 'antd';

export default class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            email: '', 
            password: '',
            firstname: '',
            lastname: '',
            success: null,
            error: null };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService(); 
    }

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.history.push('/');
            return;
        }
        document.title = 'Register';
    }

    onChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password, firstname, lastname } = this.state;
        const user = { email, password, firstname, lastname };
        this.usersService.register(user)
            .then(({ data }) => {
                
                this.setState({
                    error: null,
                    success: data.message,
                    email: '', 
                    password: '',
                    firstname: '',
                    lastname: '',
                });    
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.error
                })
            });
    }

    render() {
        const { email, password, firstname, 
                lastname, success, error } = this.state;
        let response = null;
        if (success || error) {
            response = <Alert message={error ? "Error" : "Success"} 
                        description={error ? error : success } 
                        type={error ? "error" : "success"} style={{ marginBottom: 16 }}/>
        }
        return (
            <Col span={6} offset={9} className="register-form">

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