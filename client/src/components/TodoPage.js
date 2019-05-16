import React, { Component } from 'react';
import TodoList from './TodoList';
import SearchTodos from './SearchTodos';
import FilterTodos from './FilterTodos';
import AddTask from './AddTask';
import TasksService from '../services/TasksService';

export default class TodoPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            activeFilter: 'All',
            searchText: '',
            loading: false
        };
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.renderTodoList = this.renderTodoList.bind(this);
        this.onNewTask = this.onNewTask.bind(this);
        this.onTaskEdit = this.onTaskEdit.bind(this);

        this.tasksService = new TasksService();
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.reloadList();
    }

    reloadList() {
        this.tasksService.getMyTasks()
            .then(tasks => {
                this.setState({
                    tasks: tasks,
                    loading: false
                });
            });
    }
    

    onClickRemove(id) {
        this.tasksService.deleteTask(id)
            .then(result => {
                this.reloadList();
            })
            .catch(err => {
                console.log(err);
            });
    }

    onClickDone(_id, done) {
        done = !done;
        this.updateTask({ _id, done });
        // this.tasksService.updateTask({ _id, done })
        //     .then(({ data }) => {
        //         this.setState(({ tasks }) => {
        //             const newTasks = this.replaceElemInArray(tasks, data, 
        //                 (item) => item._id === data._id);
        //             return { tasks: newTasks };
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    }

    replaceElemInArray(items, newElement, filterFunc) {
        const replaceIndex = items.findIndex(filterFunc);
        return [
                ...items.slice(0, replaceIndex),
                newElement,
                ...items.slice(replaceIndex + 1)
            ];
    }

    onSearchChange(searchText) {
        this.setState({
            searchText: searchText
        });
    }

    onFilterClick(label) {
        this.setState({
            activeFilter: label
        });
    }

    onNewTask(newTask) {
        this.tasksService.addTasks(newTask)
            .then(res => {
                const newTask = res.data;
                this.setState(({ tasks }) => {
                    return {
                        tasks: [
                            ...tasks,
                            newTask
                        ]
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    onTaskEdit(_id, newLabel) {
        this.updateTask({ _id, label: newLabel });
    }

    updateTask(task) {
        this.tasksService.updateTask(task) 
            .then(({ data }) => {
                this.setState(({ tasks }) => {
                    const newTasks = this.replaceElemInArray(tasks, data, 
                        (item) => item._id === data._id);
                    return { tasks: newTasks };
                }) 
            })
            .catch(err => {
                this.setState(this.state); 
            })
    }
    
    renderTodoList() {
        const { tasks: tasks, searchText, activeFilter, loading } = this.state;
        
        if (loading) {
            return <h1>Loading...</h1>;
        }

        let visibleItems = tasks;
        if (searchText) {
            visibleItems = visibleItems.filter(({ label }) => {
                return label.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        }
        switch (activeFilter) {
            case 'All':
                break;
            case 'Done':
                visibleItems = visibleItems.filter(({ done }) => done);
                break;
            case 'In progress':
                visibleItems = visibleItems.filter(({ done }) => !done);
                break;
        }
        
        return <TodoList todos={visibleItems}
                onClickRemove={this.onClickRemove}
                onClickDone={this.onClickDone}
                onTaskEdit={this.onTaskEdit} />
    }

    render() {
        const { activeFilter } = this.state;
        return (
            <div className="todo-page-wrapper">
                <h4 className="todo-list-title">TODO:</h4>
                <AddTask onNewTaskSubmit={this.onNewTask}/>
                <FilterTodos onFilterClick={this.onFilterClick} active={activeFilter} />
                <SearchTodos onSearchChange={this.onSearchChange} />
                {this.renderTodoList()}
            </div>
        )
    }
}