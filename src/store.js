import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'localforage';


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const intialstate = {};
const middleware = [thunk];

export default() => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
  let persistor = persistStore(store);
  return {store, persistor};
};
