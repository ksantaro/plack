import {FETCH_CHATS, NEW_CHAT} from '../actions/chatActions';

const initialState = {
  items: [],
  item: {}
}

export default function(state=initialState, action) {
  switch(action.type) {
    default:
      return state;    
  }
}