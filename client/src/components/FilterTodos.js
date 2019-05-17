import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleFilterClick } from '../actions/TodoList';

class FilterTodos extends Component {
    render() {
        const Button = styled.button`
            border: none;
            color: white;
            padding: 15px 15px;
            text-align center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 3px;
            ${({ active }) => active && `
                background: blue;
            `}
            `;

        const ButtonGroup = styled.div`
            display: grid;    
            grid-template-columns: 1fr 1fr 1fr;
            `;

        const buttonLabels = [
            'All',
            'Done',
            'In progress',
        ];

        return (
            <ButtonGroup>
                {buttonLabels.map((label) => {
                    const isActive = this.props.filter === label;
                    return (
                        <Button key={label} active={isActive}
                            onClick={() => this.props.handleFilterClick(label)}>
                            {label}
                        </Button>
                    );
                })}
            </ButtonGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(FilterTodos);
