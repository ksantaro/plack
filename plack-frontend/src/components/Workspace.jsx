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
    this.state = {
      sidebarOpen: false,
      moreModalOpen: false,
    }
  }

  toggleModal = () => {
    console.log("toggling workspace sidebar")
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    })
  }
  
  toggleMoreModal = () => {
    this.setState({
      moreModalOpen: !this.state.moreModalOpen,
    })
  }

  render() {
    //combine routes for channels and messages
    const hamburger = 
      <span className="hamburger-menu-icon" onClick={this.toggleModal}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </span>
      console.log("workspace render")

    return (
      <Router>
        <div className="main-layout">
          <div className={this.state.sidebarOpen ? "modal-overlay" : "display-none"} onClick={this.toggleModal}></div>
          <SidebarRouting 
            workspace_url={this.props.match.params.workspace_url} 
            sidebarOpen={this.state.sidebarOpen} 
            closeSidebar={this.toggleModal}
            history={this.props.history}
          />
          <div className="main">
            <Chat hamburger={hamburger}/>
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