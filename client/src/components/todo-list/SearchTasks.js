import React from 'react';
import { connect } from 'react-redux';
import { handleTaskSearch } from '../../store/actions/todo-list';
import { Input } from 'antd';
import { PropTypes } from 'prop-types';

const SearchTasks = ({ handleTaskSearch, search }) => {
    return (
        <Input.Search
                span={24}
                className="search-todo" 
                type="text" placeholder="Search" 
                onChange={(e) => { handleTaskSearch(e.target.value) }}
                value={search} />
    )   
}

SearchTasks.propTypes = {
    handleTaskSearch: PropTypes.func,
    search: PropTypes.string
}

const mapStateToProps = ({ todoListReducer: { search }}) => ({ search });

const mapDispatchToProps = { handleTaskSearch };

export default connect(mapStateToProps, mapDispatchToProps)(SearchTasks);