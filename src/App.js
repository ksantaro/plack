import React, { Component } from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Main from './Main/Main';
import {Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Route path="/sign-up" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route path="/main" component={Main} />
        </div>
      </Provider>
    );
  }
}

export default App;
