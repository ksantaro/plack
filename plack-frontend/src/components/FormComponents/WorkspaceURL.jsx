import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after


class WorkspaceURL extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.props.onSubmit}>
        <div className="form-description">
          Enter your team’s workspace url. If your team<br/>
          does not have a workspace, 
          create one <Link to="/create-workspace">here.</Link>
        </div>
        <input placeholder="WORKSPACE-URL" name="workspace_url" value={this.props.workspace_url} onChange={this.props.onChange} required/>
        <button>Next</button>
      </form>
    );
  }
}

export default WorkspaceURL;