import React, { Component } from 'react';
import TodoItem from '../TodoItem';

export default class TodoList extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <ul className="list-group todo-list">
                {
                    this.props.todos.map(({ id, label, done}) => {
                        return (
                            <li key={id} className="list-group-item todo-list-item">
                                <TodoItem label={label} done={done} 
                                        onClickRemove={() => this.props.onClickRemove(id)}
                                        onClickDone={() => this.props.onClickDone(id)} />
                            </li>
                        )
                    })
                }
            </ul>
        )
    };
}