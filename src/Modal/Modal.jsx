import React, { Component } from 'react';


class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        channelName: "",
        directMessageName: ""
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // this.props.messageType;
    var uid; // temp
    if(this.props.createType == "channel") {
        uid = this.props.channels.length;
        //uid++;
        this.props.channels.push({
            chid: uid,
            name: this.state.channelName,
            messages: [],
        });
        this.setState({
            channelName: "",
        });
    } else {
        uid = this.props.directMessages.length;
        //uid++;
        this.props.directMessages.push({
            uid: uid,
            name: this.state.directMessageName,
            messages: [],
        });
        this.setState({
            directMessageName: "",
        });
    }
    this.closeModal();
  }

  closeModal = (e) => {
    if (this.props.createType == "channel") {
        this.props.toggleModal(e, "newChannelModalOpen");
    } else {
        this.props.toggleModal(e, "newDirectMessageModalOpen")
    }
  }

  render() {
    return (
      <div className="modal-container">
        <form action="" onSubmit={this.onSubmit}>
            <span onClick={this.closeModal}>X</span>
            <h2>
                { this.props.createType == "channel" ? "Create a new channel" : "Add a friend" }
            </h2>
            { this.props.createType == "channel" && <input type="text" placeholder="channel name" value={this.state.channelName} onChange={(e) => {this.onChange(e, "channelName")}} />}
            { this.props.createType == "directMessage" && <input type="email" placeholder="example@email.com" value={this.state.directMessageName} onChange={(e) => {this.onChange(e, "directMessageName")}} />}
            <input type="submit" value={ this.props.createType == "channel" ? "Create Channel" : "Add friend"}/>
        </form>

      </div>
    );
  }
}

export default Modal;