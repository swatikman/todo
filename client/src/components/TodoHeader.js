import React, { Component } from 'react';
import { Layout, Button, Icon } from 'antd'; 
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/User';

class TodoHeader extends Component {
    
    onLogoutClick = () => {
        this.props.handleLogout();
    }
    
    render() {
        return (
            <Layout.Header style={{background: '#ffffff'}}>
                <Link to='/' style={{display: 'inline-block'}}>TODO List</Link>
                <Button style={{ marginTop: 16, float:'right'}} onClick={this.onLogoutClick}>
                    <Icon type="logout" />&nbsp;Logout
                </Button>
            </Layout.Header>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = { handleLogout };

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(TodoHeader));