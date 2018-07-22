import React, { Component } from 'react';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageInput: "",
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onSubmit = (e) => { //this.props.messageType / this.props.messagesID
    e.preventDefault();
  }

  render() {

    console.log(this.props[this.props.messageType + 's'][this.props.messagesID])
    var messages = this.props[this.props.messageType + 's'][this.props.messagesID]
    var messages = this.props[this.props.messageType + 's'][this.props.messagesID] 
    console.log(messages);
    var messageTitle;
    var messagesList;
    if (messages) {
      messageTitle = messages['name'];
      messagesList = messages.messages.map((message) => 
        <div className="message-block">
          <span className="message-username">{message.username} </span>
          <span className="message-date">{message.date} </span>
          <p className="message-content">{message.text}</p>
        </div>
      );
    }
    
    return (
      <div>
        <div className="messages-title">
          {messageTitle}
        </div>
        <div className="messages-block">
          {messagesList}
          <form onSubmit={this.onSubmit}>
            <input type="text" onChange={(e) => {this.onChange(e, "messageInput")}}/>
            <input type="submit" value="submit"/>

          </form>
        </div>
      </div>
    );
  }
}

export default Messages;