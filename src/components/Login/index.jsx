import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <form className="Login">
        <p className="login-login">Login</p>
        <p className="login-username">Username</p>
        <input className="login-input" type="text" />
        <input type="button" className="login-button" value="Login" />
      </form>
    );
  }
}
export default Login;
