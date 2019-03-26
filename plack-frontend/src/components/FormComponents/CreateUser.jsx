import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after


class CreateUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.props.onSubmit}>
        <div className="form-description">
          Signing up for the workspace: <strong>{this.props.workspace_url}</strong> <br/>
          Enter your username, email, and password.
        </div>
        <input placeholder="USERNAME" name="username" value={this.props.username} onChange={this.props.onChange} required/>
        <input type="email" placeholder="email" name="email" value={this.props.email} onChange={this.props.onChange} required/>
        <input type="password" placeholder="PASSWORD" name="password" value={this.props.password} onChange={this.props.onChange} required/>
        <input type="password" placeholder="CONFIRM PASSWORD" name="confirm_password" value={this.props.confirm_password} onChange={this.props.onChange} required/>
        {/* <span>&#8592;</span> */}
        <button>Login</button>
      </form>
    );
  }
}

export default CreateUser;