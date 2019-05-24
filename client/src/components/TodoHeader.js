import React from 'react';
import { Layout, Button, Icon } from 'antd'; 
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleLogout } from '../store/actions/user';
import { PropTypes } from 'prop-types';

const TodoHeader = ({ handleLogout }) => {
    return (
        <Layout.Header style={{background: '#ffffff'}}>
            <Link to='/' style={{display: 'inline-block'}}>TODO List</Link>
            <Button style={{ marginTop: 16, float:'right'}} onClick={ handleLogout }>
                <Icon type="logout" />&nbsp;Logout
            </Button>
        </Layout.Header>
    )
}

TodoHeader.propTypes = {
    handleLogout: PropTypes.func
}

const mapStateToProps = null;

const mapDispatchToProps = { handleLogout };

export default connect(mapStateToProps, mapDispatchToProps)(
    withRouter(TodoHeader));