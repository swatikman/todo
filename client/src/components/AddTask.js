import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddTask extends Component {
    
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
        this.props.onNewTaskSubmit(this.state.taskText);
        this.setState({
            taskText: ''
        });
    }

    render() {
        return (
            <form>
                <input type="text" 
                        onChange={this.onTaskTextChange}
                        value={this.state.taskText}
                        />
                <button onClick={this.onSubmit}>
                    Add new task
                </button>
            </form>
        )
    }
}

AddTask.propTypes = {
    onNewTaskSubmit: PropTypes.func
}