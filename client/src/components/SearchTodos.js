import React from 'react';
import { connect } from 'react-redux';
import { handleTaskSearch } from './../actions/TodoList';

const SearchTodos = ({ handleTaskSearch, search }) => {
    return (
        <input className="search-todo" 
                type="text" placeholder="Search" 
                onChange={(e) => { handleTaskSearch(e.target.value) }}
                value={search} />
    )   
}

const mapStateToProps = ({ todoListReducer: { search }}) => {
    return { search };
};

const mapDispatchToProps = {  handleTaskSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTodos);