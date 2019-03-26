import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './WorkspaceURL';
import SignIn from './SignIn';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace_url: "",
      username: "",
      password: "",
      view_number: 1,
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
    let login_view;

    switch(this.state.view_number) {
      case 1:
        login_view = <WorkspaceURL
            workspace_url={this.state.workspace_url}
            onChange={this.onChange}
            onSubmit={this.confirmWorkspaceURL}
          />
        break;
      case 2:
        login_view = <SignIn
            workspace_url={this.state.workspace_url}
            username={this.state.username}
            password={this.state.password}
            onChange={this.onChange}
            onSubmit={this.submitLogin}
          />
      default:
        console.log("no view selected");
    }
    return (
      <div>
        {login_view}
      </div>
      
    );
  }
}

export default Login;