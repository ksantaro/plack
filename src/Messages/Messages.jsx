import React, { Component } from 'react';
import axios from 'axios';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageInput: "",
        channelEmail: "",
    }
  }

  onChange = (e, valueName) => {
    this.props[this.props.messageType + 's'][this.props.index].input = e.target.value;
    console.log(this.props[this.props.messageType + 's'][this.props.index].input)
    this.setState({
        [valueName]: e.target.value 
    })
  }

  addFriendToChannel = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3010/main/channel/friend', {
      data: {
        email: this.state.channelEmail, 
        chid: this.props.messageID,
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.messageType === "channel") {
      axios.post('http://localhost:3010/main/channel/message', {
            data: {
                senderID: this.props.user.uid,
                chid: this.props.messageID,
                text: this.props[this.props.messageType + 's'][this.props.index].input
            }
        }).then((response) => {
          const newMessage = response.data.rows[0];
          newMessage.senderUsername = this.props.user.username;
          this.props.addNewMessage(true, newMessage);
        });
    } else {
      axios.post('http://localhost:3010/main/friend/message', {
            data: {
                senderID: this.props.user.uid,
                ufid: this.props.messageID,
                text: this.props[this.props.messageType + 's'][this.props.index].input
            }
        }).then((response) => {
          const newMessage = response.data.rows[0];
          newMessage.senderUsername = this.props.user.username;
          this.props.addNewMessage(false, newMessage);
        });
    }

    this.props.updateInput("")
  }

  render() {
    let messages = this.props[this.props.messageType + 's'][this.props.index]
    console.log(messages)
    let messageTitle;
    let messagesList;
    let messagesInput;
    if (messages) {
      messagesInput = messages.input;
      messageTitle = messages['name'];
      messagesList = messages.messages.map((message) => 
        <div className="message-block">
          <span className="message-username">{message.senderUsername} </span>
          <span className="message-date">{message.date} </span>
          <p className="message-content">{message.text}</p>
        </div>
      );
    }
    
    return (
      <div className="messages-side">
        <div className="messages-title">
          {/* make the messageTitle a p so you can have an overflow cutoff. 
            Also message block should have a different height based on messageType */}
          {messageTitle} 
          {this.props.messageType === "channel" && <form onSubmit={this.addFriendToChannel} className="add-friend-to-channel">Add friend to channel<input value={this.state.channelEmail} onChange={(e) => {this.onChange(e, "channelEmail")}} type="email" placeholder="address@email.com"/></form>}
        </div>
        <div className="messages-block">
          {messagesList}
          <form onSubmit={this.onSubmit}>
            <input type="text" value={messagesInput} onChange={(e) => {this.props.updateInput(e.target.value)}}/>
            <input type="submit" value="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;