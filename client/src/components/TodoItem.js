import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, List, Input, Icon } from 'antd';

export default class TodoItem extends Component {
    
    static propTypes = {
        label: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        onClickRemove: PropTypes.func.isRequired,
        onClickDone: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired
    }

    state = {
        label: this.props.label,
        editable: false
    };

    onToggleEdit = () => {
        if (this.state.editable) {
            this.props.onEdit(this.state.label);
        }
        this.setState(({ editable }) => {
            return {
                label: this.props.label,
                editable: !editable
            }
        });
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    }
    
    render() {
        const { done, onClickDone, onClickRemove } = this.props;
        const { editable } = this.state;
        return (
            <List.Item className="todo-list-item" actions={[
                <Button.Group>
                    <Button type="primary"
                            onClick={onClickRemove} disabled={editable}>
                        Remove
                    </Button>
                    <Button type="dashed"
                            onClick={onClickDone} disabled={editable}>
                        <Icon type={done ? "stop" : "check" } />
                    </Button>
                    <Button type="danger"
                            onClick={this.onToggleEdit}>
                        { editable ? 'Ok' : 'Edit' }
                    </Button>
                </Button.Group>
            ]}>
                {
                    editable
                    ? <Input type="text" value={this.state.label} onChange={this.onLabelChange}/>
                    : <span>{this.props.label}</span>
                }
            </List.Item>
        )
    }
}