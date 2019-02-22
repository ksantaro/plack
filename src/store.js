import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate, persistReducer, persistStore } from 'redux-persist';
import storage from 'localforage';

// import { combineReducers } from 'redux';
// import chatReducer from './reducers/chatReducer';
// import userReducer from './reducers/userReducer';
// import redirectReducer from './reducers/redirectReducer';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['redirect'],
}

// const rootReducer = combineReducers({
//   chats: chatReducer,
//   user: userReducer
// })

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const intialstate = {};
const middleware = [thunk];

export default() => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)));
  let persistor = persistStore(store);
  return {store, persistor};
};
