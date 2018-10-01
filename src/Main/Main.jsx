import React, { Component } from 'react';
import axios from 'axios';
import SideBar from '../SideBar/SideBar';
import Messages from '../Messages/Messages';
import Modal from '../Modal/Modal';

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
  }

  componentDidMount = () => {
    if (sessionStorage.length !== 0) {
      let user = JSON.parse(sessionStorage.getItem('user'));
      axios.get(`http://localhost:3010/main/all/${user.uid}`, {
      }).then((response) => {
        let channelMessages = JSON.parse(response.data.channel_messages);
        let directMessages = JSON.parse(response.data.direct_messages);
        if (!channelMessages) {
          channelMessages = [];
        }
        this.setState({
          user: user,
          index: 0,
          directMessages: directMessages,
          channels: channelMessages,
          messageID: directMessages[0].ufid,
        });
      })
    } else {
      window.location.href = "http://localhost:3000/login"
    }
  }

  resetView = () => {
    axios.get(`http://localhost:3010/main/all/${this.state.user.uid}`, {
      }).then((response) => {
        let channelMessages = JSON.parse(response.data.channel_messages);
        let directMessages = JSON.parse(response.data.direct_messages);
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
      channels[this.state.index].messages.push(newMessage);
      this.setState({
        channels: channels
      })
    } else {
      let directMessages = this.state.directMessages;
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
          />
        </div>
      </div>
    );
  }
}

export default Main;