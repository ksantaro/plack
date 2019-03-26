import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after


class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.props.onSubmit}>
        <div className="form-description">
          Enter your username and password for the<br/>
          workspace: <strong>{this.props.workspace_url}</strong>
        </div>
        <input placeholder="USERNAME" name="username" value={this.props.username} onChange={this.props.onChange} required/>
        <input type="password" placeholder="PASSWORD" name="password" value={this.props.password} onChange={this.props.onChange} required/>
        {/* <span>&#8592;</span> */}
        <button>Login</button>
      </form>
    );
  }
}

export default SignIn;