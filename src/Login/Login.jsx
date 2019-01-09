import React, { Component } from 'react';
import axios from 'axios';
import Topbar from '../Topbar/Topbar';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        workspace_url: '',
        email: '',
        password: '',
        error: false,
    }
  }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    // axios.post('http://localhost:3010/users/login', {
    //     data: {
    //       email: this.state.email,
    //       password: this.state.password
    //     }      
    // })
    // .then(function(res) {
    //   let user = JSON.stringify(res.data); // Eventually would be replaced by Redux-Persits
    //   sessionStorage.setItem('user', user);
    //   // let s = sessionStorage.getItem('user');
    //   window.location.href = "http://localhost:3000/main"

    // });
  }

  render() {
    
    return (
      <div>
        <Topbar/>    
        <div className="form-block">
            <h2>Login</h2>
            <p>Enter your workspace url, email address, and password</p>
            <form action="" onSubmit={this.onSubmit}>
                <input type="workspace_url" placeholder="teamJonDoe" value={this.state.workspace_url} onChange={(e) => {this.onChange(e, "workspace_url")}} required/>
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
