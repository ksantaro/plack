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
            { this.props.createType == "directMessage" && <input type="text" placeholder="example@email.com" value={this.state.directMessageName} onChange={(e) => {this.onChange(e, "directMessageName")}} />}
            <input type="submit" value={ this.props.createType == "channel" ? "Create Channel" : "Add friend"}/>
        </form>

      </div>
    );
  }
}

export default Modal;