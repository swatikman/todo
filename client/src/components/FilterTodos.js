import React from 'react';
import { connect } from 'react-redux';
import { handleFilterClick } from '../store/actions/todo-list';
import { Radio } from 'antd';
import { PropTypes } from 'prop-types';

const FilterTasks = ({ filter, handleFilterClick }) => {
    const buttonLabels = [
        'All',
        'Done',
        'In progress',
    ];
    return (
        <div className="filter-tasks">
            <Radio.Group value={filter} size="large" buttonStyle="solid" >
                {buttonLabels.map((label) => {
                    return (
                        <Radio.Button key={label}
                            onClick={() => handleFilterClick(label)}
                            value={label} >
                            {label}
                        </Radio.Button>
                    );
                })}
            </Radio.Group>
        </div>
    )
}

FilterTasks.propTypes = {
    filter: PropTypes.string,
    handleFilterClick: PropTypes.func
}

const mapStateToProps = ({ todoListReducer: { filter }}) => ({ filter });

const mapDispatchToProps = { handleFilterClick };

export default connect(mapStateToProps, mapDispatchToProps)(FilterTasks);
