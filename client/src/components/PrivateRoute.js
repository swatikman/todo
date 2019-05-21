import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            rest.token
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    )
}

const mapStateToProps = ({ user: { token }}) => ({ token }); 

export default connect(mapStateToProps)(PrivateRoute);