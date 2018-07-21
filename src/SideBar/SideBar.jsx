import React, { Component } from 'react';

var selectedMessageStyle = {backgroundColor: "#d25235"}

class SideBar extends Component {
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
    var channels = this.props.channels.map((channel) => 
      <p style={(this.props.messagesID == channel.chid && this.props.messageType == "channel" ? selectedMessageStyle : {})} 
        onClick={(e) => {this.props.onClick(e, channel.chid, "channel")}} >
        # {channel.name}</p> 
    )
    var directMessages = this.props.directMessages.map((dmessage) =>
      <p style={(this.props.messagesID == dmessage.uid && this.props.messageType == "directMessage" ? selectedMessageStyle : {})}
        onClick={(e) => {this.props.onClick(e, dmessage.uid, "directMessage")} }>
      &#8226; {dmessage.name}</p>
    )
    return (
      <div className="sidebar">
        <div className="username">
          Kenneth Santarosa
          ksantaro@uci.edu
        </div>
        <div className="message-section">
          <div className="add-another">
            Channels
            <span> +</span>
          </div>
          {channels}
        </div>
        <div className="message-section">
          <div className="add-another">
              Direct Messages
              <span> +</span>
            </div>
            {directMessages}
        </div>
      </div>
    );
  }
}

export default SideBar;