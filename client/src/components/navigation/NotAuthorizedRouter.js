import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignInForm from '../sign-in/SignInForm';
import SignUpForm from '../sign-up/SignUpForm';
import AccountVerify from '../sign-up/AccountVerify';
import PasswordReset from '../password-reset/PasswordReset';
import PasswordResetNewPassword from '../password-reset/PasswordResetNewPassword';
import NotFound from '../not-found/NotFound';

const NotAuthorizedRouter = ({ token }) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={["/", "/sign-in"]} component={SignInForm} />
                <Route exact path="/sign-up" component={SignUpForm} />
                <Route exact path="/password-reset" component={PasswordReset} />
                <Route exact path="/password-reset/:token" component={PasswordResetNewPassword} />
                <Route exact path="/account-verify/:token" component={AccountVerify} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default NotAuthorizedRouter;
