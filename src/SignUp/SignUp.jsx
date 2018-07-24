import React, { Component } from 'react';
import axios from 'axios';
import './SignUp.css';
import Topbar from '../Topbar/Topbar';



class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3010/users/register', {
      data: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      },
    });

  }

  render() {
    return (
      <div>
        <Topbar/>
        <div className="form-block">
            <h2>Sign Up</h2>
            <p>Enter your first name, last name, username, email address, and password</p>
            <form action="" onSubmit={this.onSubmit}>
                <input type="text" placeholder="first name" value={this.state.firstName} onChange={(e) => {this.onChange(e, "firstName")}} required/>
                <input type="text" placeholder="last name" value={this.state.lastName} onChange={(e) => {this.onChange(e, "lastName")}} required/>
                <input type="text" placeholder="username" value={this.state.username} onChange={(e) => {this.onChange(e, "username")}} required/>
                <input type="email" placeholder="email" value={this.state.email} onChange={(e) => {this.onChange(e, "email")}} required/>
                <input type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.onChange(e, "password")}} required/>
                <input type="password" placeholder="confirm password" value={this.state.confirmPassword} onChange={(e) => {this.onChange(e, "confirmPassword")}} required/>
                <input type="submit" value="submit &#8594;" />
            </form>
            <a href="./login">already have an account?</a>
        </div>
      </div>
    );
  }
}

export default SignUp;