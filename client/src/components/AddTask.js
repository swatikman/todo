import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAddTask } from '../actions/todo-list';
import { Button, Input, Row, Col, Form } from 'antd';

class AddTask extends Component {
    
    static propTypes = {
        fetchAddTask: PropTypes.func
    }

    state = {
        taskText: '', validationError: '',
    };

    onTaskTextChange = (e) => {
        this.setState({
            taskText: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.taskText.length === 0) {
            this.setState({
                validationError: 'Task title should not be empty'
            })
            return;
        }
        this.props.fetchAddTask({ title: this.state.taskText });
        this.setState({
            taskText: '',
            validationError: ''
        });
    }

    render() {
        return (
            <Form>
                <Row>
                    <Col span={24} className="add-task">
                        <Form.Item help={this.state.validationError}  
                            validateStatus={this.state.validationError ? 'error' : ''}>
                            <Input type="text" 
                                onChange={this.onTaskTextChange}
                                value={this.state.taskText}
                                placeholder="Task title"
                                addon={<Button />}
                                />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.onSubmit}>Add new task</Button>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        )
    }
}

const mapDispatchToProps = { fetchAddTask };

export default connect(null, mapDispatchToProps)(AddTask);