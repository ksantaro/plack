import React, { Component } from 'react';
import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';

// if chid == uid get all channels
var channels = [
  { chid: 0,
    name: 'business-plan',  
    messages: [ {
      text: "decision to procede with plan",
      date: "07/21/18 2:20pm",
      username: "kenny" //person who sent message
    }, 
    {
      text: "decision for that plan is still pending",
      date: "07/21/18 2:25pm",
      username: "lenny" //person who sent message
    },
    {
      text: "okay then we will wait for carl's response",
      date: "07/21/18 2:28pm",
      username: "kenny" //person who sent message
    }
    ]
  },
  { chid: 1,
    name: 'random',
    messages: [{
      text: "did I add you?",
      date: "07/20/18 11:00am",
      username: "randomPerson" //person who sent message
    }, {
      text: "I thought I added you.",
      date: "07/20/18 11:30am",
      username: "kenny" //person who sent message
    }]
  },
]

var directMessages = [
  { uid: 100, // This person's id
    name: 'me',
    messages: [{
      text: "Hello and thank you for joining plack! you may use this space for any note taking while you look around.",
      date: "07/21/18 10:00am",
      username: "plack"
    }
    ]
  },
  { uid: 0, // The other persons ID
    name: 'Carl', // The other person in the convo
    messages: [{
      text: "What do you think of the new plan?",
      date: "07/19/18 11:55am",
      username: "carl" //person who sent message
    }, {
      text: "I think it will work.",
      date: "07/19/18 12:30pm",
      username: "kenny" //person who sent message
    }]
  },
  { uid: 1,
    name: 'lenny', // The other person in the convo
    messages: [{
      text: "What do you think of the new plan?",
      date: "07/19/18 11:57am",
      username: "lenny" //person who sent message
    }, {
      text: "I think it will work.",
      date: "07/19/18 12:50pm",
      username: "kenny" //person who sent message
    }]
  }
];



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: 100, // starts with the current users UID
        messageType: "directMessage" // directMessage or channel
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  render() {
    return (
      <div className="main">
        <div className="sidebar-width">
          <SideBar 
            channels={channels}
            directMessages={directMessages}
          />
        </div>
        <div className="messages-width">
          <Messages 
            channels={channels}
            directMessages={directMessages}
          /> {/* props: channel */}
        </div>
      </div>
    );
  }
}

export default Main;