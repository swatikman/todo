import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class FilterTodos extends Component {
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
                    const isActive = this.props.active === label;
                    return (
                        <Button key={label} active={isActive}
                            onClick={() => this.props.onFilterClick(label)}>
                            {label}
                        </Button>
                    );
                })}
            </ButtonGroup>
        )
    }   
}

FilterTodos.propTypes = {
    onFilterClick: PropTypes.func.isRequired
}
