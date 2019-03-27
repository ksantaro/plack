import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './FormComponents/Login';
import SignUp from './FormComponents/SignUp';
import CreateWorkspace from './FormComponents/CreateWorkspace';
import { connect } from 'react-redux';
import Chat from './WorkspaceComponents/Chat';

import SidebarRouting from './WorkspaceComponents/SidebarRouting';
import ConnectedInput from './WorkspaceComponents/ConnectedInput'

// import {changeInput} from '../actions/workspaceActions';


// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

class Workspace extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   chatSelected: {
    //     type: "channel",
    //     index: 0,
    //   }
    // }
  }

  // onSelect = (e, chat) => {
  //   this.setState({
  //     chatSelected: {
  //       type: chat.type,
  //       index: chat.index
  //     }
  //   })
  // }

  render() {
    //combine routes for channels and messages
    
      
      console.log("workspace render")

    return (
      <Router>
        <div className="main-layout">
          <SidebarRouting workspace_url={this.props.match.params.workspace_url}/>
          <div className="main">
            <Chat />
            <ConnectedInput />
            {/* <ConnectedInput id={this.props.match.params.id} /> */}
            {/* <div>
              {routes.map((route, index) => (
                // Render Routes Tilte
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.name}
                />
              ))}
            </div> */}
            {/* {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))} */}
          </div>
        </div>
      </Router>
    );
  }
}

// const mapStateToProps = state => ({
//   channels: state.workspace.channels,
//   directMessages: state.workspace.directMessages,
//   // token: state.user.token, //jwt token after login
//   // error: state.user.error, //401 error if incorrect login cred
//   // userData: state.user.userData,
//   // redirectComponent: state.redirect.redirectComponent
// })

// const mapDispatchToProps = dispatch => ({
//   changeInput: (inputText, index, type) => dispatch(changeInput(inputText, index, type)),
//   // login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
//   // getCurrentUser: (token) => dispatch(getCurrentUser(token)),
//   // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
// });

export default Workspace;
// export default connect(mapStateToProps, mapDispatchToProps)(Workspace);