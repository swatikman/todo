import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RedirectRoute = ({ path, to }) => {
    return (
        <Route path={path} render={() => (<Redirect to={to} />)} />
    )
}

export default RedirectRoute;