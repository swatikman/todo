import React, { Component } from 'react';
import TodoList from './TodoList';
import SearchTasks from './SearchTasks';
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
                <Col xs={{span: 18, offset: 3}} sm={{span: 16, offset: 4}}
                md={{span: 12, offset: 6}} lg={{span: 10, offset: 7}} 
                xl={{span: 8, offset: 8}}>
                    <AddTask />
                    <FilterTasks />
                    <SearchTasks />
                    <TodoList />
                </Col>
            </Row>
            
        )
    }
}

