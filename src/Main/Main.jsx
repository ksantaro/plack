import React, { Component } from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';
import Modal from '../Modal/Modal';

// if chid == uid get all channels
var Xchannels = [
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

var XdirectMessages = [
  { uid: 0, // This person's id
    name: 'me',
    messages: [{
      text: "Hello and thank you for joining plack! you may use this space for any note taking while you look around.",
      date: "07/21/18 10:00am",
      username: "plack"
    }
    ]
  },
  { uid: 1, // The other persons ID
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
  { uid: 2,
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
        messagesID: 0, // starts with the current users UID
        messageType: "directMessage", // directMessage or channel
        newDirectMessageModalOpen: false,
        newChannelModalOpen: false,
        channels : [],
        directMessages : [],
      }
    // this.state.channels = Xchannels;
    // this.state.directMessages = XdirectMessages;
    
  }

  componentDidMount = () => {
    this.setState({
      channels: Xchannels,
      directMessages: XdirectMessages,
    });

    if (sessionStorage.length != 0) {
      let user = JSON.parse(sessionStorage.getItem('user'));
      console.log(user);
      // TODO get channels/directmessages
    } else {
      window.location.href = "http://localhost:3000/login"
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onClick = (e, id, type) => { // type (directMessage or channel)
    this.setState({
      messagesID: id,
      messageType: type,
    });
  }

  toggleModal = (e, modalName) => {
    this.setState({
      [modalName]: !this.state[modalName] 
    });
  }

  addNewMessage = (e, isDirectMessage) => { // event, bool
    if(isDirectMessage) {

    } else {}
  }

  render() {
    
    return (
      <div className="main">
        <div className="sidebar-width">
          {
            this.state.newChannelModalOpen && 
            <Modal 
              createType="channel"
              toggleModal={this.toggleModal}
              //messageType={this.props.messageType}
              channels={this.state.channels}
              directMessages={this.state.directMessages}

            />
          }
          {
            this.state.newDirectMessageModalOpen &&
            <Modal
              createType="directMessage"
              toggleModal={this.toggleModal}
              //messageType={this.props.messageType}
              directMessages={this.state.directMessages}
              channels={this.state.channels}

            />
          }
          <SideBar 
            channels={this.state.channels}
            directMessages={this.state.directMessages}
            onClick={this.onClick}
            messagesID={this.state.messagesID}
            messageType={this.state.messageType}
            newDirectMessageModalOpen={this.state.newDirectMessageModalOpen}
            newChannelModalOpen={this.state.newChannelModalOpen}
            toggleModal={this.toggleModal}
            
          />
        </div>
        <div className="messages-width">
          <Messages 
            channels={this.state.channels}
            directMessages={this.state.directMessages}
            messagesID={this.state.messagesID}
            messageType={this.state.messageType}
          /> {/* props: channel */}
        </div>
      </div>
    );
  }
}

export default Main;