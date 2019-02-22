import React, { Component } from 'react';
import axios from 'axios';
import Topbar from '../Topbar/Topbar';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';


//redux actions
import {login, getCurrentUser} from '../actions/userActions';
import {setRedirectComponent} from '../actions/redirectActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        workspace_url: '',
        email: '',
        password: '',
        // error: false,
        // redirect: false,
        // redirectLink: "",
    }
  }

  componentDidMount() {
    // TODO: remove error on refresh
  }

  // returnRedirect = () => {
  //   if(this.state.redirect) {
  //     return <Redirect to={this.state.redirectLink} />
  //   }
  // }

  // setRedirect = (redirectLink) => { //redirect to the redirectLink
  //   this.setState({
  //     redirect: true,
  //     redirectLink
  //   });
  // }

  onChange = (e, valueName) => {
    this.setState({
        [valueName]: e.target.value 
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // USE dispatch login then -> display error or redirect w/ token in localforage 
    this.props.login(this.state.workspace_url, this.state.email, this.state.password)
      .then(() => {
        if(this.props.error.length === 0) { // if error does not exist
          console.log(this.props.token);
          this.props.getCurrentUser(this.props.token)
            .then(() => {
              console.log(this.props.userData);
              console.log(this.props.history.push(`/workspace/${this.props.userData.user_id}`)); //redirects but perserves the history stack
              // this.props.setRedirectComponent(`/workspace/${this.props.userData.user_id}`);
            // this.setRedirect(`/workspace/${this.props.match.params.workspace_id}`)
            });
        }
      })
  }

  render() {
    return (
      <div>
        {this.props.redirectComponent /* Place to redirect too if needed */} 
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
            <div>
              {this.props.error.length !== 0 && this.props.error /* returns error message */} 
            </div>
            <a href="./sign-up">don't have an account?</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token, //jwt token after login
  error: state.user.error, //401 error if incorrect login cred
  userData: state.user.userData,
  redirectComponent: state.redirect.redirectComponent
})

const mapDispatchToProps = dispatch => ({
  login: (workspace_url, email, password) => dispatch(login(workspace_url, email, password)),
  getCurrentUser: (token) => dispatch(getCurrentUser(token)),
  setRedirectComponent: (redirectLink) => dispatch(setRedirectComponent(redirectLink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
