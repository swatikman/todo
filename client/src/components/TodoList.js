import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleFetchingTasks, handleUpdate, handleRemoveTask, handleAddTask } from './../actions/TodoList';
import { List, Alert, Spin } from 'antd';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.onClickDone = this.onClickDone.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);
    }

    componentDidMount() {
        this.props.handleFetchingTasks();
    }

    onClickDone(_id, done) {
        done = !done;
        this.props.handleUpdate({ _id, done });
    }

    onTaskEdit(_id, label) {
        this.props.handleUpdate({ _id, label });
    }

    render () {
        const { handleRemoveTask, tasks, filter, search, loading, minorError } = this.props;

        if (loading) {
            return <Spin size="large"  />;
        }

        let visibleItems = tasks;
        if (search) {
            visibleItems = visibleItems.filter(({ label }) => {
                return label.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            });
        }
        switch (filter) {
            case 'All':
                break;
            case 'Done':
                visibleItems = visibleItems.filter(({ done }) => done);
                break;
            case 'In progress':
                visibleItems = visibleItems.filter(({ done }) => !done);
                break;
            default:
                break;
        }
        let header = null;
        if (minorError) {
            header = (<Alert message={minorError.error} type="error" />)
        }
        return (
            <List className="todo-list"
                    header={header}>
                {
                    visibleItems.map(({ _id, done, label }) => {
                        return (
                            <TodoItem key={_id} label={label} done={done} 
                                    onClickRemove={() => handleRemoveTask(_id)}
                                    onClickDone={() => this.onClickDone(_id, done)} 
                                    onEdit={(label) => this.onTaskEdit(_id, label)}/>
                        )
                    })
                }
            </List>
        )
    }
}

TodoList.propTypes = {
    onClickRemove: PropTypes.func,
    onClickDone: PropTypes.func,
    todos: PropTypes.array
}

const mapStateToProps = ({ todoListReducer: { tasks, filter, search, loading, minorError } }) => {
    return { tasks, filter, search, loading, minorError };
}

const mapDispatchToProps = { handleFetchingTasks, handleUpdate, handleRemoveTask, handleAddTask };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);