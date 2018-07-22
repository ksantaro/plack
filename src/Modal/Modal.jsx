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

  render() {
    return (
      <div className="modal-container">
        { this.props.createType == "channel" && <input type="text" value={}/>}
        { this.props.createType == "directMessage" && <input type="text" value={} />}
      </div>
    );
  }
}

export default Modal;