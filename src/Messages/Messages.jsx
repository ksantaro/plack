import React, { Component } from 'react';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        messageInput: "",
    }
  }

  getDate = () => {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes(); //+ ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime;
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onSubmit = (e) => { //this.props.messageType / this.props.index
    e.preventDefault();
    if (this.props.messageType == "channel") {
      console.log(this.props.channels[this.props.index].messages);
      this.props.channels[this.props.index].messages.push({
        text: this.state.messageInput,
        date: this.getDate(),
        username: "kenny",
      });
    } else {
      this.props.directMessages[this.props.index].messages.push({
        text: this.state.messageInput,
        date: this.getDate(),
        username: "kenny",
      });
    }

    this.setState({
      messageInput: "",
    });
  }

  render() {

    // console.log(this.props[this.props.messageType + 's'][this.props.index])
    var messages = this.props[this.props.messageType + 's'][this.props.index]
    // var messages = this.props[this.props.messageType + 's'][this.props.index] 
    console.log(this.props[this.props.messageType + 's'][this.props.index]);
    var messageTitle;
    var messagesList;
    if (messages) {
      messageTitle = messages['name'];
      messagesList = messages.direct_messages.map((message) => 
        <div className="message-block">
          <span className="message-username">{message.senderUsername} </span>
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
            <input type="text" value={this.state.messageInput} onChange={(e) => {this.onChange(e, "messageInput")}}/>
            <input type="submit" value="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;