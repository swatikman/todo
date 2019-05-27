import React, { Component } from 'react';
import { Input, Form, Col, Button, Alert, Icon, Typography, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { emailRegexp, formResponsiveAttributes } from '../../store/utils/utils';
import { handleSignUp } from '../../store/actions/user';
import { Helmet } from 'react-helmet';
import { getError } from '../../store/utils/utils';

class SignUpForm extends Component {

    static propTypes = {
        token: PropTypes.string
    }

    emailRules = [{ required: true, pattern: emailRegexp, message: 'Please enter valid email!' }];
    passwordRules = [{ required: true, min: 6, max: 20, message: 'Password length should be between 6 and 20' }];
    firstnameRules = [{ required: true, min: 1, message: 'First name should not be empty!' }];
    lastnameRules = [{ required: true, min: 1, message: 'Last name should not be empty!' }];

    state = { 
        success: '',
        error: '',
        loading: false
    };

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = async (e) => {
        e.preventDefault();
        
        const password2 = this.props.form.getFieldValue('password2');
        if (this.props.form.getFieldValue('password') !== password2) {
            this.props.form.setFields({ 
                password2: { value: password2, errors: [ new Error('Passwords should be same')]}
            });
            return;
        }
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                await this.signUp(values);
            }
        });
    }

    signUp = async (signUpData) => {
        this.setState({
            loading: true
        });
        try {
            const { data } = await this.props.handleSignUp(signUpData);
            this.props.form.setFieldsValue({
                email: '', 
                password: '',
                password2: '',
                firstname: '',
                lastname: ''
            });
            this.setState({
                error: '',
                success: data.message,
                loading: false     
            });
        }
        catch (err) {
            this.setState({
                error: getError(err.error),
                loading: false
            });
        }
    }

    render() {

        const { success, error } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <Col {...formResponsiveAttributes}  className="sign-up-form">
                <Helmet>
                    <title>Sign up</title>
                </Helmet>
                {success ? (
                    <div className="sign-up-success">
                        <Alert message="Success" description={success} type="success" />
                        <Link to='/'>Return to main page</Link>
                    </div>
                ) : (
                    <Spin spinning={this.state.loading} tip="Loading...">
                        <Typography.Title level={3}>Sign up</Typography.Title>
                        {error && <Alert message="Error" 
                                description={error} 
                                type="error" style={{ marginBottom: 16 }}/>}
                        <Form onSubmit={this.onSubmit}>
                            <Form.Item>
                                {getFieldDecorator('email', { rules: this.emailRules })(
                                    <Input 
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="text" placeholder="Email"
                                        name="email" 
                                        onChange={this.onChange} />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', { rules: this.passwordRules })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}                                
                                        type="password" placeholder="Password"
                                        name="password"
                                        onChange={this.onChange}  />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password2', { rules: this.passwordRules })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}                                
                                        type="password" placeholder="Password (again)"
                                        name="password2"
                                        onChange={this.onChange}  />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('firstname', { rules: this.firstnameRules })(
                                    <Input 
                                        prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}                                                        
                                        type="text" placeholder="First name"
                                        name="firstname"
                                        onChange={this.onChange}  />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('lastname', { rules: this.lastnameRules })(
                                    <Input 
                                        prefix={<Icon type="meh" style={{ color: 'rgba(0,0,0,.25)' }} />}                                                        
                                        type="text" placeholder="Last name"
                                        name="lastname"
                                        onChange={this.onChange}  />
                                )}
                            </Form.Item>
                            <Button type="primary" htmlType="submit">Sign up</Button>
                        </Form>
                    </Spin>
                    )
                }
            </Col>
            );
    }
}


const mapDispatchToProps = { handleSignUp };

export default connect(null, mapDispatchToProps)(Form.create()(SignUpForm));