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

  render() {
    return (
      <div className="modal-container">
        <form action="">
            { this.props.createType == "channel" && <input type="text" value={channelName} onChange={(e) => {this.onChange(e, "channelName")}} />}
            { this.props.createType == "directMessage" && <input type="text" value={directMessageName} onChange={(e) => {this.onChange(e, "directMessageName")}} />}
            <input type="submit" onSubmit={this.onSubmit}/>
        </form>

      </div>
    );
  }
}

export default Modal;