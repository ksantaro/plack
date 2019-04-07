import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './Views/WorkspaceURL';
import CreateUser from './Views/CreateUser';
import CreateWorkspaceView from './Views/CreateWorkspaceView';

import { connect } from 'react-redux';
import {login, getCurrentUser} from '../../actions/userActions';
import {getWorkspace} from '../../actions/workspaceActions';

class CreateWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspace_url: "",
      team_name: "",
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
    this.props.getWorkspace(this.state.workspace_url).then(() => {
      console.log(this.props.workspace);
      if (this.props.workspace !== null) {
        this.setState({
          errors: {
            ...this.state.errors,
            workspace_url: `the workspace url: "${this.state.workspace_url}" already exist`,
          }
        })
      } else {
        this.setState({
          view_number: 2,
        });
      }
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

const mapStateToProps = state => ({
  token: state.user.token, //jwt token after login
  error: state.user.error, //401 error if incorrect login cred
  userData: state.user.userData,
  // redirectComponent: state.redirect.redirectComponent,
  workspace: state.workspace.workspace,
})

const mapDispatchToProps = dispatch => ({
  getWorkspace: (workspace_url) => dispatch(getWorkspace(workspace_url)),
  login: (workspace_url, username, password) => dispatch(login(workspace_url, username, password)),
  getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkspace);