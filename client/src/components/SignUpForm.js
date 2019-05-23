import React, { Component } from 'react';
import { signUp } from '../services/UsersService';
import { Input, Form, Col, Button, Alert, Icon, Typography } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class SignUpForm extends Component {

    static propTypes = {
        token: PropTypes.string
    }

    state = { 
        email: '', 
        password: '',
        firstname: '',
        lastname: '',
        success: null,
        error: null 
    };

    componentDidMount() {
        document.title = 'Sign up';
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { email, password, firstname, lastname } = this.state;
        const user = { email, password, firstname, lastname };
        try {
            const { data } = await signUp(user);
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
            console.log(err);
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
        
        let content = null;
        let errorJsx = null;
        if (error) {
            errorJsx = <Alert message="Error" 
                            description={error} 
                            type="error" style={{ marginBottom: 16 }}/>
        }
        if (success) {
            content = <Alert message="Success" 
                            description={success} 
                            type="success" />
        } else { 
            content = (
                <React.Fragment>
                    <Typography.Title level={3}>Sign up</Typography.Title>
                    {errorJsx}
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
                        <Button type="primary" htmlType="submit">Sign up</Button>
                    </Form>
                </React.Fragment>
            );
        }
        return (
            <Col span={6} offset={9} className="sign-up-form">
                {content}
            </Col>
        )
    }
}

const mapStateToProps = ({ user: { token } }) => ({ token });

export default connect(mapStateToProps)(SignUpForm);