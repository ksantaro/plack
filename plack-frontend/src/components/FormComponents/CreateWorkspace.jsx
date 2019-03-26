import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './Views/WorkspaceURL';
import CreateUser from './Views/CreateUser';
import CreateWorkspaceView from './Views/CreateWorkspaceView';

class CreateWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace_url: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      view_number: 1,
      errors: {
        workspace_url: null,
        team_name: null,
        username: null,
        email: null,
        password: null,
        confirm_password: null,
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

  submitNewUser = (e) => {
    e.preventDefault();
    this.passwordsMatch();
  }

  passwordsMatch = () => {
    if(this.state.password !== this.state.confirm_password) {
      this.setState({
        errors: {
            ...this.state.errors,
            confirm_password: "The passwords do not match."
          }
      });
    }
  }

  render() {
    let view;

    switch(this.state.view_number) {
      case 1:
        view = <CreateWorkspaceView
            workspace_url={this.state.workspace_url}
            team_name={this.state.team_name}
            onChange={this.onChange}
            onSubmit={this.confirmWorkspaceURL}
            errors={this.state.errors}
          />
        break;
      case 2:
        view = <CreateUser
            workspace_url={this.state.workspace_url}
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            confirm_password={this.state.confirm_password}
            onChange={this.onChange}
            onSubmit={this.submitNewUser}
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

export default CreateWorkspace;