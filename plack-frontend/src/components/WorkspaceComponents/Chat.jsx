import React, { Component } from 'react';
import Message from './Message';
import { connect } from 'react-redux';
import { changeInput } from '../../actions/workspaceActions';

class Chat extends Component {
  scrollToBottomAuto = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto"});
  }

  scrollToBottomSmooth = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottomAuto();
  }
  
  componentDidUpdate() {
    this.scrollToBottomSmooth();
  }

  render() {
    // console.log(this.props.chatObject.input);
    // console.log("chat rendered")
    const type = this.props.chatSelected.type;
    const index = this.props.chatSelected.index;
    const chat = this.props[`${type}s`][index];
    console.log(chat.id)
    // console.log(this.props.preservedInputs[chat.id]);
    console.log("chat rendered")
    return  (
      <div className="workspace-chat">
        <h2>{this.props.hamburger} {type === "channel" ? "#" : "@"} {chat.name}</h2>
        <div className="workspace-messages">
          {
            chat.messages.map((message, index) => {
              return <Message message={message} key={`messageKey${index}`}/>
            })
          }
          <div className="workspace-messages-end"
              ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        {/* <input value={this.props.preservedInputs[chat.id]} onChange={(e) => this.onChange(e, chat.id)}/> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.workspace.channels,
  directMessages: state.workspace.directMessages,
  chatSelected: state.workspace.chatSelected,
  // preservedInputs: state.workspace.preservedInputs,
  // token: state.user.token, //jwt token after login
  // error: state.user.error, //401 error if incorrect login cred
  // userData: state.user.userData,
  // redirectComponent: state.redirect.redirectComponent
})

const mapDispatchToProps = dispatch => ({
  // onSelect: (e, chat) => dispatch(onSelect(e, chat)),
  // changeInput: (id, text) => dispatch(changeInput(id, text)),
  // login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
  // getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

// export default Chat;
export default connect(mapStateToProps, mapDispatchToProps)(Chat);