import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './FormComponents/Login';
import SignUp from './FormComponents/SignUp';
import CreateWorkspace from './FormComponents/CreateWorkspace';
import { connect } from 'react-redux';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

class Workspace extends Component {
  render() {
    const routes = [
      {
        path: `/workspace/${this.props.match.params.workspace_url}/messages/${this.props.match.params.id}`,
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <Login />,
        name: () => <h2>Login</h2>,
      },
      {
        path: "/workspace/sign-up",
        exact: true,
        sidebar: () => <div>bubblegum!</div>,
        main: () => <SignUp />,
        name: () => <h2>Sign Up</h2>,
      },
      {
        path: "/workspace/create-workspace",
        exact: true,
        sidebar: () => <div>shoelaces!</div>,
        main: () => <CreateWorkspace />,
        name: () => <h2>Create Workspace</h2>,
      }
    ];

    return (
      <Router>
        <div className="main-layout">
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
                  return (<li>
                            <NavLink to={`/workspace/${this.props.match.params.workspace_url}/messages/${channel.id}`} activeClassName="nav-active" exact className="nav-item">
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
                  return (<li>
                            <NavLink to={`/workspace/${this.props.match.params.workspace_url}/messages/${directMessage.id}`} activeClassName="nav-active" exact className="nav-item">
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

          <div className="main">
            <div>
              {routes.map((route, index) => (
                // Render Routes Tilte
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.name}
                />
              ))}
            </div>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  channels: state.workspace.channels,
  directMessages: state.workspace.directMessages,
  // token: state.user.token, //jwt token after login
  // error: state.user.error, //401 error if incorrect login cred
  // userData: state.user.userData,
  // redirectComponent: state.redirect.redirectComponent
})

const mapDispatchToProps = dispatch => ({
  // login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
  // getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);