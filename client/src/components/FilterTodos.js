import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleFilterClick } from '../actions/TodoList';
import { Radio } from 'antd';

class FilterTasks extends Component {
    render() {

        const buttonLabels = [
            'All',
            'Done',
            'In progress',
        ];
        return (
            <div className="filter-tasks">
                <Radio.Group value={this.props.filter} size="large" buttonStyle="solid" >
                    {buttonLabels.map((label) => {
                        return (
                            <Radio.Button key={label}
                                onClick={() => this.props.handleFilterClick(label)}
                                value={label} >
                                {label}
                            </Radio.Button>
                        );
                    })}
                </Radio.Group>
            </div>
        )
    }   
}

const mapStateToProps = ({ todoListReducer: { filter }}) => {
    return { filter }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleFilterClick: (filter) => dispatch(handleFilterClick(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTasks);
