import {FETCH_CHATS, NEW_CHAT} from '../actions/chatActions';

//Example of Workspace
/*
two types of chats Channels and DMs

channels: [
  id,
  name,
  messages, //same as DMs
]

directMessages: [
  {
    id,
    name, //name is the names of the persons the dms are with
    messages: [
      {
        senderName,
        senderID,
        text,
        timestamp,
      },
      ...
    ],
  }
  ...
]

maybe do it like this with a key to organize the different chats, 
try the normal way first because on click you can retrive the id

chat_id: {
  id,name,messages
}

when adding a channel, return sorted channels and update. Same with DMs.
when adding a message, make a call to backend, return the new message and add it to messages
*/
const initialState = {
  items: [],
  item: {},
}

export default function(state=initialState, action) {
  switch(action.type) {
    default:
      return state;    
  }
}