import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import FormInput from '../../CommonComponents/FormInput';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.props.onSubmit}>
        <div className="form-description">
          Enter your username and password for the
          workspace: <strong>{this.props.workspace_url}</strong>
        </div>
        <FormInput placeholder="USERNAME" name="username" value={this.props.username} onChange={this.props.onChange} required error={this.props.errors.username}/>
        <FormInput type="password" placeholder="PASSWORD" name="password" value={this.props.password} onChange={this.props.onChange} required error={this.props.errors.password}/>
        {/* <span>&#8592;</span> */}
        <button>Login</button>
      </form>
    );
  }
}

export default SignIn;