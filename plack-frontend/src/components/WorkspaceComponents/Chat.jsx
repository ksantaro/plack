import React, { Component } from 'react';
import Message from './Message';

class Chat extends Component {
  onChange = (e) => {
    const type = this.props.isChannel ? "channels" : "directMessages";
    this.props.changeInput(e.target.value, this.props.index, type)
  }

  render() {
    console.log(this.props.chatObject.input);
    console.log("chat rendered")
    return  (
      <div className="workspace-chat">
        <h2>{this.props.isChannel ? "#" : "@"} {this.props.chatObject.name}</h2>
        {
          this.props.chatObject.messages.map((message, index) => {
            return <Message message={message} key={`messageKey${index}`}/>
          })
        }
        <input value={this.props.chatObject.input} onChange={this.onChange}/>
      </div>
    );
  }
}

export default Chat;