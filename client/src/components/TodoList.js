import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleFetchingTasks, handleUpdate } from './../actions/TodoList';

class TodoList extends Component {

    constructor(props) {
        super(props);

        this.onClickDone = this.onClickDone.bind(this);
    }

    componentDidMount() {
        this.props.handleFetchingTasks();
    }

    onClickDone(_id, done) {
        done = !done;
        this.props.handleUpdate({ _id, done });
    }

    render () {
        const { onClickRemove, handleUpdate, onTaskEdit, tasks, filter, search, loading } = this.props;

        if (loading) {
            return <h1>Loading...</h1>;
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
        }
        return (
            <ul className="list-group todo-list">
                {
                    visibleItems.map(({ _id, done, label }) => {
                        return (
                            <li key={_id} className="list-group-item todo-list-item">
                                <TodoItem label={label} done={done} 
                                        onClickRemove={() => onClickRemove(_id)}
                                        onClickDone={() => this.onClickDone(_id, done)} 
                                        onEdit={(label) => onTaskEdit(_id, newLabel)}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

TodoList.propTypes = {
    onClickRemove: PropTypes.func,
    onClickDone: PropTypes.func,
    todos: PropTypes.array
}

const mapStateToProps = ({ todoListReducer: { tasks, filter, search, loading } }) => {
    return { tasks, filter, search, loading };
}

const mapDispatchToProps = { handleFetchingTasks, handleUpdate };

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);