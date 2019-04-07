import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './FormComponents/Login';
import SignUp from './FormComponents/SignUp';
import CreateWorkspace from './FormComponents/CreateWorkspace';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// const hamburger = 
// <span className="hamburger-menu-icon">
//   <span className="line"></span>
//   <span className="line"></span>
//   <span className="line"></span>
// </span>



class EntryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    }
  }

  toggleModal = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen,
    })
  }

  render () {
    const hamburger = 
      <span className="hamburger-menu-icon" onClick={this.toggleModal}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </span>

    const routes = [
      {
        path: "/u",
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <Login history={this.props.history}/>,
        name: () => <h2>{hamburger} Login</h2>,
      },
      {
        path: "/u/sign-up",
        exact: true,
        sidebar: () => <div>bubblegum!</div>,
        main: () => <SignUp history={this.props.history}/>,
        name: () => <h2>{hamburger} Sign Up</h2>,
      },
      {
        path: "/u/create-workspace",
        exact: true,
        sidebar: () => <div>shoelaces!</div>,
        main: () => <CreateWorkspace history={this.props.history}/>,
        name: () => <h2>{hamburger} Create Workspace</h2>,
      }
    ];

    console.log(this.props.history);

    return (
      <Router>
        <div className="main-layout">
          <div className={this.state.sidebarOpen ? "modal-overlay" : "display-none"} onClick={this.toggleModal}></div>
          <div className={this.state.sidebarOpen ? "sidebar sidebar-modal" : "sidebar"}>
            <div className="title-box">
              {/* title component */}
              <h3>Prello</h3>
            </div>
            <ul>
              <li>
                <NavLink to="/u" activeClassName="nav-active" exact className="nav-item" onClick={this.toggleModal} >Login</NavLink>
              </li>
              <li>
                <NavLink to="/u/sign-up" activeClassName="nav-active" className="nav-item" onClick={this.toggleModal}>Sign up</NavLink>
              </li>
              <li>
                <NavLink to="/u/create-workspace" activeClassName="nav-active" className="nav-item" onClick={this.toggleModal}>Create Workspace</NavLink>
              </li>
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

export default EntryComponent;