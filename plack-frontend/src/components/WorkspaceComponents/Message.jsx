import React, { Component } from 'react';

class Message extends Component {
  render() {
    return  (
      <div className="workspace-message">
        {this.props.message.text}
      </div>
    );
  }
}

export default Message;