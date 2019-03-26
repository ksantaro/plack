import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './Views/WorkspaceURL';
import SignIn from './Views/SignIn';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace_url: "",
      username: "",
      password: "",
      view_number: 1,
      errors: {
        workspace_url: null,
        username: null,
        password: null,
      },
    }
  }

  componentDidMount() {
      window.onpopstate = () => {
      if (this.state.view_number == 2) {
        this.setState({
          view_number: 1,
        });
      }
    }
  }

  onChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  confirmWorkspaceURL = (e) => {
    e.preventDefault();
    // After calling backend to check, if exists change view_number
    this.setState({
      view_number: 2,
    });
  }

  submitLogin = (e) => {
    e.preventDefault();
  }

  render() {
    let view;

    switch(this.state.view_number) {
      case 1:
        view = <WorkspaceURL
            workspace_url={this.state.workspace_url}
            onChange={this.onChange}
            onSubmit={this.confirmWorkspaceURL}
            errors={this.state.errors}
          />
        break;
      case 2:
        view = <SignIn
            workspace_url={this.state.workspace_url}
            username={this.state.username}
            password={this.state.password}
            onChange={this.onChange}
            onSubmit={this.submitLogin}
            errors={this.state.errors}
          />
      default:
        console.log("no view selected");
    }
    return (
      <div>
        {view}
      </div>
      
    );
  }
}

export default Login;