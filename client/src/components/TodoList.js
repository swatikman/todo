import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTasks, fetchUpdateTask, fetchRemoveTask } from '../actions/todo-list';
import { List, Alert, Spin } from 'antd';

class TodoList extends Component {
    static propTypes = {
        fetchTasks: PropTypes.func,
        fetchUpdateTask: PropTypes.func,
        fetchRemoveTask: PropTypes.func
    }

    componentDidMount() {
        this.props.fetchTasks();
    }

    onClickDone = (_id, done) => {
        done = !done;
        this.props.fetchUpdateTask({ _id, done });
    }

    onTaskEdit = (_id, title) => {
        this.props.fetchUpdateTask({ _id, title });
    }

    render() {
        const { tasks, filter, search, loading, error, minorError,
                fetchRemoveTask, fetchUpdateTask } = this.props;

        if (error) {
            return (<Alert message="Error" description="Can't load TODO list" 
                    type="error" style={{ marginTop: 16 }} />)
        }

        if (loading) {
            return <Spin size="large"  />;
        }

        let visibleItems = tasks;
        if (search) {
            visibleItems = visibleItems.filter(({ title }) => {
                return title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
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
            header = (<Alert message={minorError} type="error" />)
        }
        return (
            <List className="todo-list"
                    header={header}>
                {
                    visibleItems.map(({ _id, done, title }) => {
                        return (
                            <TodoItem key={_id} title={title} done={done} 
                                    onClickRemove={() => fetchRemoveTask(_id)}
                                    onClickDone={() => this.onClickDone(_id, done)} 
                                    onEdit={(title) => fetchUpdateTask({ _id, title })}/>
                        )
                    })
                }
            </List>
        )
    }
}

const mapStateToProps = ({ todoListReducer: { tasks, filter, search, error, loading, minorError } }) => (
    { tasks, filter, search, error, loading, minorError });

const mapDispatchToProps = { fetchTasks, fetchUpdateTask, fetchRemoveTask };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);