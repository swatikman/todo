import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './Store';
import TodoPage from './components/TodoPage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import PrivateRoute from './components/PrivateRoute';
import AccountVerify from './components/AccountVerify';
import PasswordReset from './components/PasswordReset';
import PasswordResetNewPassword from './components/PasswordResetNewPassword';
import NotFound from './components/NotFound';
import 'antd/dist/antd.css';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
          <Switch>
              <PrivateRoute exact path="/" component={TodoPage} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route exact path="/password_reset" component={PasswordReset} />
              <Route exact path="/password_reset/:token" component={PasswordResetNewPassword} />
              <Route exact path="/register/:token" component={AccountVerify} />
              <Route component={NotFound} />
          </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
