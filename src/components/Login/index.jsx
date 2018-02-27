import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <p className="login-login">Login</p>
        <p className="login-username">Username</p>
        <input className="login-input" type="text" onChange={e => this.props.username(e)} />
        <input type="button" className="login-button" value="Login" onClick={() => this.props.login()} />
      </div>
    );
  }
}
export default Login;
