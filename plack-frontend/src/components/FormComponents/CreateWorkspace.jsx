import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import WorkspaceURL from './Views/WorkspaceURL';
import CreateUser from './Views/CreateUser';
import CreateWorkspaceView from './Views/CreateWorkspaceView';

import { connect } from 'react-redux';
import {login, getCurrentUser, createWorkspace, clearError} from '../../actions/userActions';
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
    if (this.validateWorkspaceUrlFormat(this.state.workspace_url)) {
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
    } else {
      this.setState({
        errors: {
          ...this.state.errors,
          workspace_url: 'Invalid workspace url'
        }
      })
    }
  }

  submitNewWorkspaceAndUser = (e) => {
    e.preventDefault();
    // this.passwordsMatch();
    if(this.passwordsMatch()) {
      this.props.createWorkspace(this.state.workspace_url, this.state.team_name, this.state.username, this.state.email, this.state.password).then(() => {
        if(Object.keys(this.props.error).length === 0) { // if error does not exist
          console.log(this.props.token);
          this.props.getCurrentUser(this.props.token)
            .then(() => {
              console.log(this.props.userData);
              this.props.history.push(`/workspace/${this.props.userData.user_id}/messages/1`); //redirects but perserves the history stack
              // this.props.setRedirectComponent(`/workspace/${this.props.userData.user_id}`);
            // this.setRedirect(`/workspace/${this.props.match.params.workspace_id}`)
            });
        } else {
          console.log(this.props.error);
          this.setState({
            errors: {
              ...this.state.errors,
              [this.props.error.type]: `${this.props.error.message}`,
            }
          }, () => {console.log(this.state.errors); this.props.clearError()})
        }
      })
    }
  }

  passwordsMatch = () => {
    console.log(this.state.password !== this.state.confirm_password);
    if(this.state.password !== this.state.confirm_password) {
      this.setState({
        errors: {
            ...this.state.errors,
            confirm_password: "The passwords do not match."
          }
      }, () => {return false});
    } else {
      return true;
    }
  }

  /** 
   * @param {string} workspace_url - The workspace url must not contain spaces
   * @returns {boolean} - if not a valid url return false and raise an error
   */
  validateWorkspaceUrlFormat(workspace_url) {
    let pattern = new RegExp('^[/.a-zA-Z0-9-]+$');
    console.log(workspace_url);
    console.log(pattern.test(workspace_url));
    // if() {
      
    // }
    return pattern.test(workspace_url);
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
            onSubmit={this.submitNewWorkspaceAndUser}
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
  clearError: () => dispatch(clearError()),
  createWorkspace: (workspace_url, workspace_name, username, email, password) => dispatch(createWorkspace(workspace_url, workspace_name, username, email, password)),
  // setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkspace);