import React, { Component } from 'react';
import { Layout, Button, Icon } from 'antd'; 
import { clearStorage } from './../services/LocalStorage';
import { withRouter } from 'react-router-dom';

class TodoHeader extends Component {
    
    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    onLogoutClick() {
        clearStorage();
        this.props.history.push('/');
    }
    
    render() {
        return (
            <Layout.Header style={{background: '#ffffff'}}>
                <div style={{display: 'inline-block'}}>TODO List</div>
                <Button style={{ marginTop: 16, float:'right'}} onClick={this.onLogoutClick}>
                    <Icon type="logout" />&nbsp;Logout
                </Button>
            </Layout.Header>
        )
    }
    
}

export default withRouter(TodoHeader);