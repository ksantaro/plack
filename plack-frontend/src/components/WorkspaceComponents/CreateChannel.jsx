import React, { Component } from 'react';
import Modal from '../CommonComponents/Modal';
import FormInput from '../CommonComponents/FormInput';

class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel_name: "",
      errors: {
        channel_name: null,
      }
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ // for now brings up an error message for testing
      errors: {
        ...this.state.errors,
        channel_name: "testing the error message"
      }
    });
    console.log("submitted");
  }

  render() {
    return(
      <Modal active={this.props.active}>
        <div className="modal-sidebar-create">
          <div className="modal-sidebar-create-position">
            <div className="modal-sidebar-create-title">
              Create Channel
              <span className="modal-sidebar-create-close" onClick={this.props.toggleModal}>X</span>
            </div>
            <div className="modal-sidebar-create-description">
              Enter the channel name below. Channels are visible to all members.
            </div>
            <form onSubmit={this.onSubmit}>
              {/* <input placeholder="CHANNEL NAME" required/> */}
              <FormInput placeholder="CHANNEL NAME" name="channel_name" value={this.state.channel_name} onChange={this.onChange} error={this.state.errors.channel_name} required/>
              <button className={this.state.channel_name === "" && "button-inactive"} >Create</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreateChannel;
