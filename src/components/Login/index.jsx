import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <p className="login-login">Login</p>
        <p className="login-username">Username</p>
        <input className="login-input" type="text" onChange={e => this.props.username(e)} />
        <Button onClick={() => this.props.login()} />
      </div>
    );
  }
}
Login.propTypes = {
  username: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
export default Login;
