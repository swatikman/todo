import React from 'react';
import { isAuthenticated } from './../services/LocalStorage';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            isAuthenticated()
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    )
}

export default PrivateRoute;