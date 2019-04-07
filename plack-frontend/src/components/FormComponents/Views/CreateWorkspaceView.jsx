import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import FormInput from '../../CommonComponents/FormInput';

class CreateWorkspaceView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.props.onSubmit}>
        <div className="form-description">
          Enter your team name and create a workspace url
          to invite you team members to. If you are trying to
          join an existing team sign up <Link to='/u/sign-up'>here.</Link>
        </div>
        <FormInput placeholder="TEAM NAME" name="team_name" value={this.props.team_name} onChange={this.props.onChange} required error={this.props.errors.team_name}/>
        <FormInput type="text" placeholder="WORKSPACE-URL (NO SPACES)" name="workspace_url" value={this.props.workspace_url} onChange={this.props.onChange} required error={this.props.errors.workspace_url}/>        
        <button onClick={this.props.confirmWorkspaceURL}>Next</button>
      </form>
    );
  }
}

export default CreateWorkspaceView;