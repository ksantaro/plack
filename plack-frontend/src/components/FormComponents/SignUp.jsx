import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './Views/WorkspaceURL';
import CreateUser from './Views/CreateUser';
import { connect } from 'react-redux';
import {login, getCurrentUser, createUser} from '../../actions/userActions';
import {getWorkspace} from '../../actions/workspaceActions';

class SignUp extends Component {
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
      if (this.props.workspace === null) {
        this.setState({
          errors: {
            ...this.state.errors,
            workspace_url: `the workspace url: "${this.state.workspace_url}" does not exist`,
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
    this.props.createUser(this.props.workspace, this.state.username, this.state.email, this.state.password).then((res) => {
      if(this.props.error.length === 0) { // if error does not exist
        console.log(this.props.token);
        this.props.getCurrentUser(this.props.token)
          .then(() => {
            console.log(this.props.userData);
            this.props.history.push(`/workspace/${this.props.userData.user_id}/messages/1`); //redirects but perserves the history stack
            // this.props.setRedirectComponent(`/workspace/${this.props.userData.user_id}`);
          // this.setRedirect(`/workspace/${this.props.match.params.workspace_id}`)
          });
      } else {
        this.setState({
          errors: {
            ...this.state.errors,
            password: `${this.props.error}`,
          }
        })
      }
    })
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
        view = <WorkspaceURL
            workspace_url={this.state.workspace_url}
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
  createUser: (workspace, username, email, password) => dispatch(createUser(workspace, username, email, password)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
