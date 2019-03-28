import React, { Component } from 'react';
import Modal from '../CommonComponents/Modal';

class CreateChannel extends Component {
  render() {
    return(
      <Modal>
        <div className="modal-sidebar-create">
          <div className="modal-sidebar-create-title">
            Create Channel
            <span className="modal-sidebar-create-title">X</span>
          </div>
          

        </div>
      </Modal>
    );
  }
}

export default CreateChannel;
