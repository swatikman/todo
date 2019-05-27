import React, { Component } from 'react';
import { Input, Form, Button, Col, Alert, Typography, Spin } from 'antd';
import { emailRegexp, formResponsiveAttributes, getError } from '../../store/utils/utils';
import { connect } from 'react-redux';
import { handlePasswordReset } from '../../store/actions/user';
import { Helmet } from 'react-helmet';

class PasswordReset extends Component {

    state = { email: '', success: '', error: '', loading: false };

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
            const { data } = await this.props.handlePasswordReset(email);
            this.setState({
                success: data.message,
                email: '',
                loading: false
            })
        } catch (err) {
            this.setState({
                error: getError(err.error),
                loading: false
            });
        }
    }

    render() {
        const { success, error, email, loading } = this.state;
        return (
            <Col {...formResponsiveAttributes} className="password-reset-form">
                <Helmet>
                    <title>Password reset</title>
                </Helmet>
                {success
                    ? <Alert message="Success" description={success} type="success" />
                    : <Spin spinning={loading}>
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
                }
            </Col>
        );
    }
}

const mapDispatchToProps = { handlePasswordReset };

export default connect(null, mapDispatchToProps)(PasswordReset);