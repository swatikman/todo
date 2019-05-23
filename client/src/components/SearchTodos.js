import React from 'react';
import { connect } from 'react-redux';
import { handleTaskSearch } from '../actions/todo-list';
import { Input } from 'antd';
import { PropTypes } from 'prop-types';

const SearchTodos = ({ handleTaskSearch, search }) => {
    return (
        <Input.Search className="search-todo" 
                type="text" placeholder="Search" 
                onChange={(e) => { handleTaskSearch(e.target.value) }}
                value={search} />
    )   
}

SearchTodos.propTypes = {
    handleTaskSearch: PropTypes.func,
    search: PropTypes.string
}

const mapStateToProps = ({ todoListReducer: { search }}) => ({ search });

const mapDispatchToProps = { handleTaskSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTodos);