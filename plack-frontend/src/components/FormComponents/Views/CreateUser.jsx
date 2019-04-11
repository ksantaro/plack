import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //delete after
import FormInput from '../../CommonComponents/FormInput';

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
        <FormInput placeholder="USERNAME" name="username" value={this.props.username} onChange={this.props.onChange} required error={this.props.errors.username}/>
        <FormInput type="email" placeholder="EMAIL" name="email" value={this.props.email} onChange={this.props.onChange} required error={this.props.errors.email}/>
        <FormInput type="password" placeholder="PASSWORD" name="password" value={this.props.password} onChange={this.props.onChange} required/>
        <FormInput type="password" placeholder="CONFIRM PASSWORD" name="confirm_password" value={this.props.confirm_password} onChange={this.props.onChange} required error={this.props.errors.confirm_password}/>        
        <button>Login</button>
      </form>
    );
  }
}

export default CreateUser;