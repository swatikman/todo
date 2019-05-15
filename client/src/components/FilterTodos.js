import React, { Component } from 'react';

export default class FilterTodos extends Component {
    render() {
        return (
            <ul className="list-group list-group-horizontal">
                <li className="list-group-item">All</li>
                <li className="list-group-item">Done</li>
                <li className="list-group-item">In Progress</li>
            </ul>
        )
    }   
}