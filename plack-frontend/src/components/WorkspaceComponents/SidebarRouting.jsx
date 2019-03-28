import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { onSelect, changeInput } from '../../actions/workspaceActions';
import CreateChannel from '../WorkspaceComponents/CreateChannel';
import CreateDirectMessage from '../WorkspaceComponents/CreateDirectMessage';

class SidebarRouting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createChannelActive: false,
      createDirectMessageActive: false,
    }
  }

  toggleModal(chatType) {
    this.setState({
      [chatType]: !this.state[chatType],
    });
  }
  
  render() {
    // console.log(this.props.channels);
    return (
      <div className="sidebar">
        <CreateChannel active={this.state.createChannelActive} toggleModal={() => {this.toggleModal("createChannelActive")}}/>
        <div className="title-box">
          {/* Replace with this.props.workspace.name && this.props.user.username*/}
          <h3>Workspace Name</h3>
          <h5>username</h5>
        </div>
          <div className="nav-heading">
            Channels
            <span className="nav-open-modal" onClick={() => {this.toggleModal("createChannelActive")}}>+</span>
          </div>
          <ul className="workspace-chat">
            {
              this.props.channels.map((channel, index) => {
                return (<li key={`channelLinkKey${channel.id}`}>
                          <NavLink onClick={(e) => this.props.onSelect(e, {type: "channel", index: index})} to={`/workspace/${this.props.workspace_url}/messages/${channel.id}`} activeClassName="nav-active" exact className={this.props.chatSelected.type === "channel" && this.props.chatSelected.index === index ? "nav-item nav-active" : "nav-item"}>
                            <span className="nav-width">
                              # {channel.name}
                            </span>
                          </NavLink>
                        </li>)
              })
            }
          </ul>
          <div className="nav-heading">Direct Messages<span className="nav-open-modal">+</span></div>
          <ul className="workspace-chat">
            {
              this.props.directMessages.map((directMessage, index) => {
                return (<li key={`directMessageLinkKey${directMessage.id}`}>
                          <NavLink onClick={(e) => this.props.onSelect(e, {type: "directMessage", index: index})} to={`/workspace/${this.props.workspace_url}/messages/${directMessage.id}`} activeClassName="nav-active" exact className="nav-item">
                            <span className="nav-width">
                              @ {directMessage.name}
                            </span>
                          </NavLink>
                        </li>)
              })
            }
          </ul>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  channels: state.workspace.channels,
  directMessages: state.workspace.directMessages,
  chatSelected: state.workspace.chatSelected,
  // token: state.user.token, //jwt token after login
  // error: state.user.error, //401 error if incorrect login cred
  // userData: state.user.userData,
  // redirectComponent: state.redirect.redirectComponent
})

const mapDispatchToProps = dispatch => ({
  onSelect: (e, chat) => dispatch(onSelect(e, chat)),
  // changeInput: (inputText, index, type) => dispatch(changeInput(inputText, index, type)),
  // login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
  // getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

// export default SidebarRouting
export default connect(mapStateToProps, mapDispatchToProps)(SidebarRouting);