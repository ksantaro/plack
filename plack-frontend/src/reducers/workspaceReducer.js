// import {FETCH_CHATS, NEW_CHAT} from '../actions/workspaceActions';
import * as WorkspaceActions from '../actions/workspaceActions';


const placeholderChannels = [
  {
    id: 33,
    name: "channel one",
    messages: [],
    input: "",
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
    ],
    input: "",
  },
  {
    id: 15,
    name: "really long name channel is here",
    messages: [],
    input: "",
  }
];

const placeholderDirectMessages = [
  {
    id: 12,
    name: "me",
    messages: [],
    input: "",
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
    ],
    input: "",
  },
  {
    id: 2,
    name: "Alex, Willy, Jimmy, Kenneth",
    messages: [],
    input: "",
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

const preservedInputs = {}


//both are just chats, so ids will not collide
for (let channel of placeholderChannels) {
  console.log(channel.id);
  preservedInputs[channel.id] = "";
}

for (let directMessage of placeholderDirectMessages) {
  preservedInputs[directMessage.id] = "";
}

const initialState = {
  channels: placeholderChannels,
  directMessages: placeholderDirectMessages,
  chatSelected: {
    type: "directMessage",
    index: 0,
  },
  preservedInputs,
  workspace: null,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case WorkspaceActions.GET_WORKSPACE_SUCCESS:
    console.log(action.payload.workspace);
      return {
        ...state,
        workspace: action.payload.workspace,
      }
    case WorkspaceActions.ON_SELECT:
      return {
        ...state,
        chatSelected: {
          type: action.payload.type,
          index: action.payload.index,
        }
      }
      break;
    case WorkspaceActions.CHANGE_INPUT:
      return {
        ...state,
        preservedInputs: {
          ...state['preservedInputs'],
          [action.payload.id]: action.payload.text,
        }
      }
      break;
      // console.log(action.payload);  
      // const stateCopy = Object.assign({}, state); // Will this make the program run slow?
      // const chatCopy = 
      // stateCopy = { ...state}
      // stateCopy[action.payload.type][action.payload.index].input = action.payload.inputText;
      // state.channels[arrayNum].input
      // const chatCopy = state[action.payload.type];
      // chatCopy[action.payload.index].input = action.payload.inputText;
      // console.log(state[action.payload.type]);
      // const chatArrayCopy = [...state[action.payload.type]];
      // console.log(chatArrayCopy);
      // chatArrayCopy[action.payload.index].input = action.payload.inputText;
      // console.log(chatArrayCopy);
      // return {
      //   ...state,
      //   [action.payload.type]: [...state[action.payload.type]]

        // [action.payload.type]: chatArrayCopy,

        
        // [action.payload.type]: state[action.payload.type].map(
        //     (chat, i) => i === action.payload.index ? {...state[action.payload.type][i], input: action.payload.inputText}
        //                             : state[action.payload.type][i]
        // )
        // [action.payload.type]: chatCopy
        // [action.payload.type]: [...chatCopy]
        // [action.payload.type]: {
        //   ...action.payload.type,
        //   input: messagesCopy,
        // },
        // [action.payload.type][action.payload.index]: action.payload.inputText,
      // }
    default:
      return state;    
  }
}