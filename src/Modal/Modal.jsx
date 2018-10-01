import React, { Component } from 'react';
import axios from 'axios';


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
    if(this.props.createType === "channel") {
        axios.post('http://localhost:3010/main/channel', {
            data: {
                channel_name: this.state.channelName,
                uid: this.props.user.uid,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name
            }
        }).then((response) => {
            this.props.resetView();
        });
    } else {
        axios.post('http://localhost:3010/main/friend', {
            data: {
                email: this.state.directMessageName,
                uid: this.props.user.uid,
                first_name: this.props.user.first_name,
                last_name: this.props.user.last_name
            }
        }).then((response) => {
            this.props.resetView();
        });
    }
    this.closeModal();
  }

  closeModal = (e) => {
    if (this.props.createType === "channel") {
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
                { this.props.createType === "channel" ? "Create a new channel" : "Add a friend" }
            </h2>
            { this.props.createType === "channel" && <input type="text" placeholder="channel name" value={this.state.channelName} onChange={(e) => {this.onChange(e, "channelName")}} />}
            { this.props.createType === "directMessage" && <input type="email" placeholder="example@email.com" value={this.state.directMessageName} onChange={(e) => {this.onChange(e, "directMessageName")}} />}
            <input type="submit" value={ this.props.createType === "channel" ? "Create Channel" : "Add friend"}/>
        </form>

      </div>
    );
  }
}

export default Modal;