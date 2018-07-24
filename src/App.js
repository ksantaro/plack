import React, { Component } from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Main from './Main/Main';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/sign-up" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="/main" component={Main} />
      </div>
    );
  }
}

export default App;
