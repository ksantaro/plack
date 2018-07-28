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

var X2directMessages = {
  2 : { 
    uid: 2, // This person's id
    name: 'me',
    messages: [{
      text: "Hello and thank you for joining plack! you may use this space for any note taking while you look around.",
      date: "07/21/18 10:00am",
      username: "plack"
    }
    ]
}
}

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
        index: 0, // starts with the current users UID
        messageID: 0, // starts with own id ufid or chid
        messageType: "directMessage", // directMessage or channel
        newDirectMessageModalOpen: false,
        newChannelModalOpen: false,
        channels: [],
        directMessages: [],
        user: {},
      }
    // this.state.channels = Xchannels;
    // this.state.directMessages = XdirectMessages;
    
  }

  componentDidMount = () => {
    this.setState({
      // channels: Xchannels,
      // directMessages: XdirectMessages,
    });

    if (sessionStorage.length != 0) {
      let user = JSON.parse(sessionStorage.getItem('user'));
      console.log(user);  
      // axios.post('http://localhost:3010/users/', {
      //   data: {
      //     email: this.state.email,
      //     password: this.state.password
      //   }      
      // }).then(function(response) {
      //   console.log(response);
      // });
      
      axios.get(`http://localhost:3010/main/all/${user.uid}`, {
      }).then((response) => {
        let channelMessages = JSON.parse(response.data.channel_messages);
        let directMessages = JSON.parse(response.data.direct_messages);
        console.log(directMessages);
        console.log(channelMessages)
        if (!channelMessages) {
          channelMessages = [];
        }
        this.setState({
          user: user,
          index: 0,
          directMessages: directMessages,
          channels: channelMessages,
          messageID: directMessages[0].ufid, // set to  own ufid
        });
      })
      // TODO get channels/directmessages
    } else {
      window.location.href = "http://localhost:3000/login"
    }
  }

  resetView = () => {
    console.log(this.state.user.uid);
    axios.get(`http://localhost:3010/main/all/${this.state.user.uid}`, {
      }).then((response) => {
        let channelMessages = JSON.parse(response.data.channel_messages);
        let directMessages = JSON.parse(response.data.direct_messages);
        console.log(directMessages);
        console.log(channelMessages)
        if (!channelMessages) {
          channelMessages = [];
        }
        this.setState({
          directMessages: directMessages,
          channels: channelMessages,
        });
      })
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onClick = (e, index, messageID, type) => { // type (directMessage or channel)
    this.setState({
      index: index,
      messageType: type,
      messageID: messageID,
    });
  }

  toggleModal = (e, modalName) => {
    this.setState({
      [modalName]: !this.state[modalName] 
    });
  }

  addNewMessage = (isDirectMessage, newMessage) => { // event, bool
    if(isDirectMessage) {
      let channels = this.state.channels;
      console.log(channels);
      channels[this.state.index].messages.push(newMessage);
      this.setState({
        channels: channels
      })
    } else {
      let directMessages = this.state.directMessages;
      console.log(directMessages);
      directMessages[this.state.index].messages.push(newMessage);
      this.setState({
        directMessages: directMessages
      })
    }
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
              channels={this.state.channels}
              directMessages={this.state.directMessages}
              user={this.state.user}
              resetView={this.resetView}
            />
          }
          {
            this.state.newDirectMessageModalOpen &&
            <Modal
              createType="directMessage"
              toggleModal={this.toggleModal}
              directMessages={this.state.directMessages}
              channels={this.state.channels}
              user={this.state.user}
              resetView={this.resetView}
            />
          }
          <SideBar 
            channels={this.state.channels}
            directMessages={this.state.directMessages}
            onClick={this.onClick}
            index={this.state.index}
            messageType={this.state.messageType}
            newDirectMessageModalOpen={this.state.newDirectMessageModalOpen}
            newChannelModalOpen={this.state.newChannelModalOpen}
            toggleModal={this.toggleModal}
            user={this.state.user}
          />
        </div>
        <div className="messages-width">
          <Messages 
            channels={this.state.channels}
            directMessages={this.state.directMessages}
            index={this.state.index}
            messageType={this.state.messageType}
            messageID={this.state.messageID}
            user={this.state.user}
            addNewMessage={this.addNewMessage}
          /> {/* props: channel */}
        </div>
      </div>
    );
  }
}

export default Main;