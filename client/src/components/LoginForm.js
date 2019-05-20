import React, { Component } from 'react'
import UsersService from '../services/UsersService';
import { saveUser, isAuthenticated } from '../services/LocalStorage';
import { Link } from 'react-router-dom';
import { Input, Icon, Form, Button, Col, Alert } from 'antd';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { email: '', password: '', error: null };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.usersService = new UsersService(); 
    }

    componentDidMount() {
        if (isAuthenticated()) {
            this.props.history.push('/');
            return;        
        }
        document.title = 'Login';
    }

    onChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.usersService.login(this.state.email, this.state.password)
            .then(({ data, headers }) => {
                
                saveUser(headers['token'], data);
                
                this.setState({
                    error: null
                });    
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    error: err.response.data.error
                })
                
            });
    }

    render() {
        const { email, password, error } = this.state;
        let errorJsx = null;
        if (error) {
            errorJsx = <Alert message="Error" description={error} type="error" />
        }
        return (
            <Col span={6} offset={9} className="login-form">
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