import React, { Component } from 'react';


class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
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
        <div>
          {message.username}
          {message.date}
          {message.text}
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
          <input type="text" />
        </div>
      </div>
    );
  }
}

export default Messages;