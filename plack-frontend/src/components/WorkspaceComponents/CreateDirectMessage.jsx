import React, { Component } from 'react';
import Modal from '../CommonComponents/Modal';
import FormInput from '../CommonComponents/FormInput';

const membersPlaceholder = [
  {id: 1, name: "Willy", selected: false, index: 0},
  {id: 20, name: "Jimmy", selected: false, index: 1},
  {id: 13, name: "Alex", selected: false, index: 2},
  {id: 21, name: "G", selected: false, index: 3},
  {id: 9, name: "Kenny", selected: false, index: 4},
]

class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_text: "",
      all_members: membersPlaceholder,
      // selected_members: [],
      errors: {
        members: null,
      }
    }
  }


  selectedLength = () => {
    let length = 0;
    for (let member of this.state.all_members) {
      if(member.selected) {
        length += 1;
      }
    }
    return length;
  }

  onSelect = (e, index, isAdding) => {
    if (isAdding && this.selectedLength() >= 4) {
      this.setState({
        errors: {
          ...this.state.errors,
          members: "you can only select at most 4 members to create a direct message group"
        }
      });
    } else {
      this.setState(state => {
        const all_members = state.all_members;
        all_members[index].selected = !state.all_members[index].selected;
        return {
          all_members
        };
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // this.setState({ // for now brings up an error message for testing
    //   errors: {
    //     ...this.state.errors,
    //     members: "testing the error message"
    //   }
    // });
    console.log(this.state.all_members);
  }

  buttonInactive = () => {
    // return this.state.selected_members.length === 0;
    const selectedMemberExists = this.state.all_members.find((member) => {
      return member.selected;
    });
    // console.log(selectedMemberExists);
    // console.log(selectedMemberExists === undefined);
    if (selectedMemberExists === undefined) {
      return "button-inactive";
    }
    return "";
  }

  render() {
    const filteredMembers = this.state.all_members.filter((member) => {
      // console.log(member);
      // console.log(member.name);
      // console.log(member.name.startsWith(this.state.search_text));

      if (member.name.toUpperCase().startsWith(this.state.search_text.toUpperCase())) {
        return member.name;
      };
    })

    return(
      <Modal active={this.props.active}>
        <div className="modal-sidebar-create">
          <div className="modal-sidebar-create-position">
            <div className="modal-sidebar-create-title">
              Direct Message
              <span className="modal-sidebar-create-close" onClick={this.props.toggleModal}>X</span>
            </div>
            <div className="modal-sidebar-create-description">
              You may select up to 4 different members.
            </div>
            <div>
              <div className="selector-input-box">
                {
                  this.state.all_members.map((member, index) => {
                    if (member.selected) {
                      return (
                        <div className="selected-option" key={`memberSelectedOption${member.id}`}  onClick={(e) => {this.onSelect(e, member.index)}}>
                          <span className="selected-option-name">
                            {member.name}
                          </span>
                          <span className="selected-option-unselect">x</span>
                        </div>
                      )
                    }
                  })
                }
                {/* <input/> */}
              </div>
              {/* <button className={this.buttonInactive()} >Create</button> */}
            </div>
            <form onSubmit={this.onSubmit}>
              {/* InputSelctor */}
              <div className="selector-container">
                <input placeholder="SEARCH FOR A MEMBER" name="search_text" value={this.state.search_text} onChange={this.onChange}></input>
                {/* <button className={this.state.channel_name === "" && "button-inactive"} >Create</button> */}
                <button className={this.buttonInactive()} >Create</button> 
                {this.state.errors.members &&  <span className="form-error-message">{this.state.errors.members}</span>} 
                <div className="selector-options">
                  {
                    filteredMembers.map((member, index) => {
                      if (!member.selected) {
                        return (
                          <div className="selector-option" onClick={(e) => {this.onSelect(e, member.index, true)}} key={`memberOption${member.id}`}>
                            {member.name}
                          </div>)
                      }
                    })
                  }
                </div>
              </div>
              {/* InputSelctor */}
              {/* <FormInput placeholder="CHANNEL NAME" name="channel_name" value={this.state.channel_name} onChange={this.onChange} error={this.state.errors.channel_name} required/> */}
              {/* <button className={this.state.channel_name === "" && "button-inactive"} >Create</button> */}
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreateChannel;