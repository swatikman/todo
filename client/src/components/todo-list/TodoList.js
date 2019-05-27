import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleFetchTasks, handleUpdateTask, handleRemoveTask } from '../../store/actions/todo-list';
import { List, Alert, Spin } from 'antd';

class TodoList extends Component {
    static propTypes = {
        handleFetchTasks: PropTypes.func,
        handleUpdateTask: PropTypes.func,
        handleRemoveTask: PropTypes.func
    }

    componentDidMount() {
        this.props.handleFetchTasks();
    }

    onClickDone = (_id, done) => {
        done = !done;
        this.props.handleUpdateTask({ _id, done });
    }

    onTaskEdit = (_id, title) => {
        this.props.handleUpdateTask({ _id, title });
    }

    render() {
        const { tasks, loading, error, minorError, 
                handleRemoveTask, handleUpdateTask } = this.props;

        if (error) {
            return (<Alert message="Error" description="Can't load TODO list" 
                    type="error" style={{ marginTop: 16 }} />)
        }

        if (loading) {
            return <Spin size="large" style={{ width: '100%' }}  />;
        }

        return (
            <List className="todo-list" header={minorError && <Alert message={minorError} type="error" />}>
                {
                    tasks.map(({ _id, done, title }) => {
                        return (
                            <TodoItem key={_id} title={title} done={done} 
                                    onClickRemove={() => handleRemoveTask(_id)}
                                    onClickDone={() => this.onClickDone(_id, done)} 
                                    onEdit={(title) => handleUpdateTask({ _id, title })}/>
                        )
                    })
                }
            </List>
        )
    }
}

const mapStateToProps = ({ todoListReducer: { tasks, filter, search, error, loading, minorError } }) => (
    { tasks, filter, search, error, loading, minorError });

const mapDispatchToProps = { handleFetchTasks, handleUpdateTask, handleRemoveTask };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);