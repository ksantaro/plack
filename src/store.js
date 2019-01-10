import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intialstate = {};
const middleware = [thunk];
const store = createStore(rootReducer, intialstate, applyMiddleware(...middleware));

export default store;
