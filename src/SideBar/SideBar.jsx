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

  openModal = (e, modalName) => {
    if (this.props[modalName] != true) {
      this.props.toggleModal(e, modalName);
    }
  }

  signOut = (e) => {
    sessionStorage.removeItem('user');
    window.location.href = "http://localhost:3000/login"
  }

  render() {
    // var channels = this.props.channels.map((channel) => 
    //   <p style={(this.props.index == channel.chid && this.props.messageType == "channel" ? selectedMessageStyle : {})} 
    //     onClick={(e) => {this.props.onClick(e, channel.chid, "channel")}} >
    //     # {channel.name}</p> 
    // )
    var channels = Object.keys(this.props.channels).map((channelKey, index) => {
      let channel = this.props.channels[channelKey];
      return( <p style={(this.props.index == index && this.props.messageType == "channel" ? selectedMessageStyle : {})} 
        onClick={(e) => {this.props.onClick(e, index, channel.chid, "channel")}} >
        # {channel.name}</p> )
    })
    var directMessages = this.props.directMessages.map((dmessage, index) =>
      <p style={(this.props.index == index && this.props.messageType == "directMessage" ? selectedMessageStyle : {})}
        onClick={(e) => {this.props.onClick(e, index, dmessage.ufid, "directMessage")} }>
      &#8226; {dmessage.name}</p>
    )


    // let keys =[ ...myMap.keys() ];

    // var directMessages = Object.keys(this.props.directMessages).map((directMessageKey) => {
    //   let dmessage = this.props.directMessages[directMessageKey];
    //   return (<p style={(this.props.index == dmessage.uid && this.props.messageType == "directMessage" ? selectedMessageStyle : {})}
    //     onClick={(e) => {this.props.onClick(e, dmessage.uid, "directMessage")} }>
    //     &#8226; {dmessage.name}</p>)
    // })
    return (
      <div className="sidebar">
        <div onClick={this.signOut}>
          Sign Out
        </div>
        <div className="username">
          <span className="name">{this.props.user.first_name} {this.props.user.last_name}</span>
          <span className="email">{this.props.user.email}</span>
        </div>
        <div className="message-section">
          <div className="add-another">
            Channels
            <span onClick={(e) => {this.openModal(e, "newChannelModalOpen")}} > +</span>
          </div>
          {channels}
        </div>
        <div className="message-section">
          <div className="add-another">
              Direct Messages
              <span onClick={(e) => {this.openModal(e, "newDirectMessageModalOpen")}}> +</span>
            </div>
            {directMessages}
        </div>
      </div>
    );
  }
}

export default SideBar;