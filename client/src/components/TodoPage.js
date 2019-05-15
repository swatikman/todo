import React, { Component } from 'react';
import TodoList from './TodoList';
import SearchTodos from './SearchTodos';
import FilterTodos from './FilterTodos';

export default class TodoPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        }
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }

    componentDidMount() {
        const todos = this.generateTodos();
        this.setState({
                todos: todos
        });
    }

    generateTodos() {
        const todos = [];
        for (let i = 0; i < 10; i++) {
            todos.push({
                id: i,
                label: 'Eat bread',
                done: false
            });
        }    
        todos.push({
            id: 123,
            label: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis ipsum dolor, a egestas enim accumsan nec. Nullam porta odio ut mollis elementum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc tincidunt ex quis sapien congue eleifend. Integer mattis nunc non enim rhoncus, in maximus eros scelerisque. Integer lobortis sollicitudin libero, sit amet consectetur felis consequat quis. Integer et finibus lacus. Sed scelerisque mauris vel turpis luctus, nec elementum tellus efficitur. Duis sit amet scelerisque nisl.`,
            done: true
        })
     
        return todos;
    }

    onClickRemove(id) {
        console.log('remove', id);
        this.setState(({ todos }) => {
            const doneIndex = todos.findIndex((item) => item.id === id);
            return {
                todos: [
                    ...todos.slice(0, doneIndex),
                    ...todos.slice(doneIndex + 1)
                ]
            } 
        });
    }

    onClickDone(id) {
        console.log('done', id);
    }
    
    render() {
        return (
            <div>
                <h4 className="todo-list-title">TODO:</h4>
                <SearchTodos />
                <FilterTodos />
                <TodoList todos={this.state.todos}
                    onClickRemove={this.onClickRemove}
                    onClickDone={this.onClickDone} />
            </div>
        )
    }
}