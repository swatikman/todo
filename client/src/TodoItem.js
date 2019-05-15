import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ label, done, onClickDone, onClickRemove }) => {
    return (
        <React.Fragment>
            <span>{label}</span>
            <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onClickRemove}>
                Remove
            </button>
            <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onClickDone}>
                Done
            </button>
            <button type="button"
                    className="btn btn-outline-primary btn-sm float-right">
                Edit
            </button>
        </React.Fragment>
    )
}

TodoItem.propTypes = {
    label: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onClickRemove: PropTypes.func,
    onClickDone: PropTypes.func
}

export default TodoItem;