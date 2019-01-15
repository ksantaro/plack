// import {FETCH_CHATS, NEW_CHAT} from '../actions/chatActions';
import * as UserActions from '../actions/userActions';
import { userInfo } from 'os';

const initialState = {
  tokenData: null,
  token: '',
  error: '',
}

export default function(state=initialState, action) {
  switch(action.type) {
    //LOGIN
    case UserActions.USER_LOGOUT:
      return initialState;
    case UserActions.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        error: '',
      };
    case UserActions.LOGIN_ERROR:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state;
  }
}