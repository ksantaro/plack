import React, { Component } from 'react';
import Topbar from '../Topbar/Topbar';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Topbar/>    
        <div className="form-block">
            <h2>Login</h2>
            <p>Enter your email address and password</p>
            <form action="" onSubmit={this.onSubmit}>
                <input type="email" placeholder="address@email.com" value={this.state.email} onChange={(e) => {this.onChange(e, "email")}} required/>
                <input type="password" placeholder="password" value={this.state.password} onChange={(e) => {this.onChange(e, "password")}} required/>
                <input type="submit" value="submit &#8594;" />
            </form>
            <a href="./sign-up">don't have an account?</a>
        </div>
      </div>
    );
  }
}

export default Login;
