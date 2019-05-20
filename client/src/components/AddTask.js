import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleAddTask } from '../actions/TodoList';
import { Button, Input, Row, Col } from 'antd';

class AddTask extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            taskText: '',
        };

        this.onTaskTextChange = this.onTaskTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTaskTextChange(e) {
        this.setState({
            taskText: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.handleAddTask(this.state.taskText);
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
                            placeholder="Task label"
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

AddTask.propTypes = {
    handleAddTask: PropTypes.func
}

const mapDispatchToProps = { handleAddTask };

export default connect(null, mapDispatchToProps)(AddTask);