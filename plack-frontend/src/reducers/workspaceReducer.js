import {FETCH_CHATS, NEW_CHAT} from '../actions/chatActions';

const placeholderChannels = [
  {
    id: 33,
    name: "channel one",
    messages: []
  },
  {
    id: 20,
    name: "new channel",
    messages: [
      {
        senderName: "friendo",
        senderId: 2,
        text: "Hello here is my message.",
        timestamp: "05/04 12:40pm",
      },
      {
        senderName: "friendo",
        senderId: 2,
        text: "I just wanted to follow up with the “Hello here is my message.",
        timestamp: "05/04 1:34pm",
      },
      {
        senderName: "Alex",
        senderId: 4,
        text: "Here is an example of a really long message that just goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and ",
        timestamp: "05/05 2:34pm",
      },
      {
        senderName: "Collaberator",
        senderId: 2,
        text: "Here is a message with enters.\nAnother enter.\nOne more enter\n.Last enter.\n",
        timestamp: "06/01 5:09pm",
      },
    ]
  },
  {
    id: 15,
    name: "really long name channel is here",
    messages: []
  }
];

const placeholderDirectMessages = [
  {
    id: 12,
    name: "me",
    messages: []
  },
  {
    id: 11,
    name: "friendo, Alex, Collaberator",
    messages: [
      {
        senderName: "friendo",
        senderId: 2,
        text: "Hello here is my message.",
        timestamp: "05/04 12:40pm",
      },
      {
        senderName: "friendo",
        senderId: 2,
        text: "I just wanted to follow up with the “Hello here is my message.",
        timestamp: "05/04 1:34pm",
      },
      {
        senderName: "Alex",
        senderId: 4,
        text: "Here is an example of a really long message that just goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and ",
        timestamp: "05/05 2:34pm",
      },
      {
        senderName: "Collaberator",
        senderId: 2,
        text: "Here is a message with enters.\nAnother enter.\nOne more enter\n.Last enter.\n",
        timestamp: "06/01 5:09pm",
      },
    ]
  },
  {
    id: 2,
    name: "Alex, Willy, Jimmy, Kenneth",
    messages: []
  }
];

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
  channels: placeholderChannels,
  directMessages: placeholderDirectMessages,
}

export default function(state=initialState, action) {
  switch(action.type) {
    default:
      return state;    
  }
}