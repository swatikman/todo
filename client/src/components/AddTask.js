import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAddTask } from '../actions/todo-list';
import { Button, Input, Row, Col } from 'antd';

class AddTask extends Component {
    
    static propTypes = {
        fetchAddTask: PropTypes.func
    }

    state = {
        taskText: '',
    };

    onTaskTextChange = (e) => {
        this.setState({
            taskText: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.fetchAddTask({ title: this.state.taskText });
        this.setState({
            taskText: ''
        });
    }

    render() {
        return (
            <form>
                <Row>
                    <Col span={18} className="add-task">
                        <Input type="text" 
                            onChange={this.onTaskTextChange}
                            value={this.state.taskText}
                            placeholder="Task title"
                            addon={<Button />}
                            />
                    </Col>
                    <Col span={6} push={1}>
                        <Button type="primary" onClick={this.onSubmit}>Add new task</Button>
                    </Col>
                </Row>
                
            </form>
        )
    }
}

const mapDispatchToProps = { fetchAddTask };

export default connect(null, mapDispatchToProps)(AddTask);