import React, { Component } from 'react';

export default class SearchTodos extends Component {

    constructor(props) {
        super(props)
        this.state = { searchText: '' };
        
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event) {
        this.setState({
            searchText: event.target.value
        });

        this.props.onSearchChange(event.target.value);
    }

    render() {
        return (
            <input className="search-todo" 
                    type="text" placeholder="Search" 
                    onChange={this.onSearchChange}
                    value={this.state.searchText} />
        )
    }   
}