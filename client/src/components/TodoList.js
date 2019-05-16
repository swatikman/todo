import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

const TodoList = ({ todos, onClickRemove, onClickDone, onTaskEdit }) => {
    return (
        <ul className="list-group todo-list">
            {
                todos.map(({ _id, done, label }) => {
                    return (
                        <li key={_id} className="list-group-item todo-list-item">
                            <TodoItem label={label} done={done} 
                                    onClickRemove={() => onClickRemove(_id)}
                                    onClickDone={() => onClickDone(_id, done)} 
                                    onEdit={(newLabel) => onTaskEdit(_id, newLabel)}/>
                        </li>
                    )
                })
            }
        </ul>
    )
}

TodoList.propTypes = {
    onClickRemove: PropTypes.func,
    onClickDone: PropTypes.func,
    todos: PropTypes.array
}

export default TodoList;