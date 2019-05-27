import React, { Component } from 'react';
import { Form, Input, Button, Alert, Col, Typography } from 'antd';
import { formResponsiveAttributes, getError } from '../../store/utils/utils';
import { connect } from 'react-redux';
import { handlePasswordResetNewPassword } from '../../store/actions/user';
import { Helmet } from 'react-helmet';
import { PropTypes } from 'prop-types';

class PasswordResetNewPassword extends Component {
    
    static propTypes = {
        handlePasswordResetNewPassword: PropTypes.func
    }

    state = { 
        password1: '', 
        password2: '',
        success: '',
        error: ''
    };

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
            await this.props.handlePasswordResetNewPassword(token, password1);
            this.setState({
                success: 'You can now login with new password',
                error: ''
            });
        } catch (err) {
            this.setState({
                success: '',
                error: getError(err.error)
            });
        }
    }

    render() {
        const { password1, password2, error, success } = this.state;
        return (
            <Col {...formResponsiveAttributes} className="password-reset-form2">
                <Helmet>
                    <title>Password reset</title>
                </Helmet>
                {success
                    ? <Alert message={success} type="success" />
                    : <Form onSubmit={this.onSubmit}>
                        <Typography.Title level={3} >
                            Type your new password
                        </Typography.Title>
                        {error &&  <Alert message={error} type="error" style={{ marginBottom: 16}}/>}
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
                }
            </Col>
        )
    }
}

const mapDispatchToProps = { handlePasswordResetNewPassword };

export default connect(null, mapDispatchToProps)(PasswordResetNewPassword);