import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeInput } from '../../actions/workspaceActions';

//Made into it's own class to avoid re-rendering sidebar and messages

class ConnectedInput extends Component {
  onChange = (e, id) => {
    // const type = this.props.isChannel ? "channels" : "directMessages";
    this.props.changeInput(id, e.target.value)
  }
  //maybe add a send button

  render() {
    const type = this.props.chatSelected.type;
    const index = this.props.chatSelected.index;
    const chat = this.props[`${type}s`][index];

    return(
      <div className="workspace-input-container">
        <div className="workspace-input-position">
          <input placeholder="Type to send a message" value={this.props.preservedInputs[chat.id]} onChange={(e) => this.onChange(e, chat.id)}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.workspace.channels,
  directMessages: state.workspace.directMessages,
  chatSelected: state.workspace.chatSelected,
  preservedInputs: state.workspace.preservedInputs,
  // token: state.user.token, //jwt token after login
  // error: state.user.error, //401 error if incorrect login cred
  // userData: state.user.userData,
  // redirectComponent: state.redirect.redirectComponent
});

const mapDispatchToProps = dispatch => ({
  // onSelect: (e, chat) => dispatch(onSelect(e, chat)),
  changeInput: (id, text) => dispatch(changeInput(id, text)),
  // login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
  // getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedInput);