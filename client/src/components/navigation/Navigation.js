import React from 'react';
import { connect } from 'react-redux';
import AuthorizedRouter from './AuthorizedRouter';
import NotAuthorizedRouter from './NotAuthorizedRouter';

const Navigation = ({ token }) => {
    return (
        token  
        ? <AuthorizedRouter />
        : <NotAuthorizedRouter />
    );
}

const mapStateToProps = ({ user: { token }}) => ({ token });

export default connect(mapStateToProps)(Navigation);
