import React from 'react';
import { connect } from 'react-redux';
import { handleTaskSearch } from './../actions/TodoList';
import { Input } from 'antd';

const SearchTodos = ({ handleTaskSearch, search }) => {
    return (
        <Input.Search className="search-todo" 
                type="text" placeholder="Search" 
                onChange={(e) => { handleTaskSearch(e.target.value) }}
                value={search} />
    )   
}

const mapStateToProps = ({ todoListReducer: { search }}) => ({ search });

const mapDispatchToProps = { handleTaskSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTodos);