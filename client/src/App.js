import React from 'react';
import './App.css';
import TodoPage from './components/TodoPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={TodoPage} />
            <Route exact path="/login" component={LoginPage} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
