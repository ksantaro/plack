import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Login from './FormComponents/Login';
import SignUp from './FormComponents/SignUp';

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.
const routes = [
  {
    path: "/login",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <Login />,
    name: () => <h2>Login</h2>,
  },
  {
    path: "/sign-up",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>,
    name: () => <h2>Sign Up</h2>,
  },
  {
    path: "/create-workspace",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>,
    name: () => <h2>Create Workspace</h2>,
  }
];

function MainLayout() {
  return (
    <Router>
      <div className="main-layout">
        <div className="sidebar">
          <div className="title-box">
            {/* title component */}
            <h3>Prello</h3>
          </div>
          <ul>
            <li>
              <NavLink to="/login" activeClassName="nav-active" className="nav-item">Login</NavLink>
            </li>
            <li>
              <NavLink to="/sign-up" activeClassName="nav-active" className="nav-item">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/create-workspace" activeClassName="nav-active" className="nav-item">Create Workspace</NavLink>
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
              // Render more <Route>s with the same paths as
              // above, but different components this time.
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

export default MainLayout;