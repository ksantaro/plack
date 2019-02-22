import React, { Component } from 'react';
import './App.css';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import Main from './Main/Main';
import Workspace from './components/Workspace';

import {Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import storeFunc from './store.js';
// import persistor from './store.js';
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react';

const storeConfig = storeFunc();
const store = storeConfig.store;
const persistor = storeConfig.persistor;

class App extends Component {
  // state = {
  //   isReady: false,
  // }

  // componentDidMount() {
  //   persistStore(store, 
  //     {
  //       storage: AsyncStorage,
  //     },
  //     () => {
  //       this.setState({ isReady: true})
  //     })
  // }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Login} />
            <Route path="/main" component={Main} />
            <Route path='/workspace/:workspace_id' component={Workspace} />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
