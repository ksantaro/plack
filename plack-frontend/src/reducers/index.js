import { combineReducers } from 'redux';
import chatReducer from './chatReducer';
import userReducer from './userReducer';
import redirectReducer from './redirectReducer';

export default combineReducers({
  chats: chatReducer,
  user: userReducer,
  redirect: redirectReducer,
})