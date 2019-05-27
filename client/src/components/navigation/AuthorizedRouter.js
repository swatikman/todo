import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TodoPage from '../todo-list/TodoPage';
import NotFound from '../not-found/NotFound';
import RedirectRoute from './RedirectRoute';

const AuthorizedRouter = ({ token }) => {
    return (
        <BrowserRouter>
            <Switch>
                <RedirectRoute path={['/sign-in', '/sign-up', '/password-reset', '/password-reset/:token', 'account-verify/:token']} to='/' />
                <Route exact path="/" component={TodoPage} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default AuthorizedRouter;
