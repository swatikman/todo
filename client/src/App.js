import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TodoPage from './components/TodoPage';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import PrivateRoute from './components/PrivateRoute';
import AccountVerify from './components/AccountVerify';
import PasswordReset from './components/PasswordReset';
import PasswordResetNewPassword from './components/PasswordResetNewPassword';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/" component={TodoPage} />
            <Route exact path="/sign-in" component={SignInForm} />
            <Route exact path="/sign-up" component={SignUpForm} />
            <Route exact path="/password-reset" component={PasswordReset} />
            <Route exact path="/password-reset/:token" component={PasswordResetNewPassword} />
            <Route exact path="/account-verify/:token" component={AccountVerify} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
