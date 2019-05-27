import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, List, Input, Icon } from 'antd';

export default class TodoItem extends Component {
    
    static propTypes = {
        title: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired,
        onClickRemove: PropTypes.func.isRequired,
        onClickDone: PropTypes.func.isRequired,
        onEdit: PropTypes.func.isRequired
    }

    state = {
        title: this.props.title,
        editable: false
    };

    onToggleEdit = () => {
        if (this.state.editable) {
            this.props.onEdit(this.state.title);
        }
        this.setState(({ editable }) => {
            return {
                title: this.props.title,
                editable: !editable
            }
        });
    }

    onLabelChange = (e) => {
        this.setState({
            title: e.target.value
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
                    ? <Input type="text" value={this.state.title} onChange={this.onLabelChange}/>
                    : <span>{this.props.title}</span>
                }
            </List.Item>
        )
    }
}