import { combineReducers } from 'redux';
import workspaceReducer from './workspaceReducer';
import userReducer from './userReducer';
import redirectReducer from './redirectReducer';

export default combineReducers({
  workspace: workspaceReducer,
  user: userReducer,
  redirect: redirectReducer,
})