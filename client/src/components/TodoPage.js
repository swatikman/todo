import React, { Component } from 'react';
import TodoList from './TodoList';
import SearchTodos from './SearchTodos';
import FilterTasks from './FilterTodos';
import AddTask from './AddTask';
import { Col, Row } from 'antd';
import TodoHeader from './TodoHeader';

export default class TodoPage extends Component {

    componentDidMount() {
        document.title = 'TODO List';
    }

    render() {
        return (
            <Row>
                <Col>
                    <TodoHeader />
                </Col>
                <Col span={8} offset={6}>
                    <AddTask />
                    <FilterTasks />
                    <SearchTodos />
                    <TodoList />
                </Col>
            </Row>
            
        )
    }
}

