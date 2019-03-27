import React, { Component } from 'react';

class Message extends Component {
  render() {
    // senderId 
    return  (
      <div className="workspace-message">
        <span className="workspace-message-sender-name">{this.props.message.senderName}</span>
        <span className="workspace-message-timestamp">{this.props.message.timestamp}</span>
        <div className="workspace-message-text">{this.props.message.text}</div>
      </div>
    );
  }
}

export default Message;