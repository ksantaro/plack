import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { onSelect, changeInput } from '../../actions/workspaceActions';


class SidebarRouting extends Component {
  render() {
    // const routes = this.props.channels.map((channel, index) => { 
    //   return {
    //     path: `/workspace/${this.props.match.params.workspace_url}/messages/${channel.id}`,
    //     exact: true,
    //     main: () => <Chat 
    //                   chatObject={channel} 
    //                   isChannel 
    //                   index={index} 
    //                   changeInput={this.props.changeInput} 
    //                   key={`channelKey${channel.id}`}
    //                 />
    //   }
    // }).concat(
    //   this.props.directMessages.map((directMessage, index) => {
    //     return {
    //       path: `/workspace/${this.props.match.params.workspace_url}/messages/${directMessage.id}`,
    //       exact: true,
    //       main: () => <Chat 
    //                     chatObject={directMessage}
    //                     index={index}
    //                     changeInput={this.props.changeInput}
    //                     key={`directMessageKey${directMessage.id}`}
    //                   />
    //     }
    // }));
    // console.log(this.props.channels);
    return (
      <div className="sidebar">
            <div className="title-box">
              {/* Replace with this.props.workspace.name && this.props.user.username*/}
              <h3>Workspace Name</h3>
              <h5>username</h5>
            </div>
            <div className="nav-heading">Channels</div>
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
            <div className="nav-heading">Direct Messages</div>
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

            {/* {routes.map((route, index) => (
              // You can render a <Route> in as many places
              // as you want in your app. It will render along
              // with any other <Route>s that also match the URL.
              // So, a sidebar or breadcrumbs or anything else
              // that requires you to render multiple things
              // in multiple places at the same URL is nothing
              // more than multiple <Route>s.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))} */}
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