import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAddTask } from '../../store/actions/todo-list';
import { Button, Input, Row, Col, Form } from 'antd';

class AddTask extends Component {
    
    static propTypes = {
        handleAddTask: PropTypes.func
    }

    state = {
        taskText: '', 
        validationError: '',
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
        this.props.handleAddTask({ title: this.state.taskText });
        this.setState({
            taskText: '',
            validationError: ''
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
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
                            <Button type="primary" htmlType="submit">Add new task</Button>
                        </Form.Item>
                    </Col>
                </Row>
                
            </Form>
        )
    }
}

const mapDispatchToProps = { handleAddTask };

export default connect(null, mapDispatchToProps)(AddTask);