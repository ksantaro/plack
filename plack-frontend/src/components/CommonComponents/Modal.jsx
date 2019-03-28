import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      // <div className={this.props.active ? "modal" : "modal modal-hidden"}>
      <div className={this.props.active ? "modal modal-show" : "modal"}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;