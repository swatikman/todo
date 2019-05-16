import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            label: this.props.label,
            editable: false
        };

        this.onToggleEdit = this.onToggleEdit.bind(this);
        this.onLabelChange = this.onLabelChange.bind(this);
    }

    onToggleEdit() {
        if (this.state.editable) {
            this.props.onEdit(this.state.label);
        }
        this.state.label = this.props.label;
        this.setState(({ editable }) => {
            return {
                editable: !editable
            }
        });
    }

    onLabelChange(e) {
        this.setState({
            label: e.target.value
        });
    }
    
    render() {
        const { done, onClickDone, onClickRemove } = this.props;
        const { editable } = this.state;
        const doneText = done ? 'Undone' : 'Done';
        return (
            <React.Fragment>
                {
                    editable
                    ? <input type="text" value={this.state.label} onChange={this.onLabelChange}/>
                    : <span>{this.props.label}</span>
                }
                <button type="button"
                        onClick={onClickRemove} disabled={editable}>
                    Remove
                </button>
                <button type="button"
                        onClick={onClickDone} disabled={editable}>
                    {doneText}
                </button>
                <button type="button"
                        onClick={this.onToggleEdit}>
                    { editable ? 'Ok' : 'Edit' }
                </button>
            </React.Fragment>
        )
    }
}

TodoItem.propTypes = {
    label: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired,
    onClickRemove: PropTypes.func.isRequired,
    onClickDone: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}