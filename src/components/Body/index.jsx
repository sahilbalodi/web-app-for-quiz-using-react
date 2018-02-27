import React, { Component } from 'react';
import Welcome from '../Welcome';
import Login from '../Login';
import './Body.css';

class Body extends Component {
  render() {
    return (
      <div className="loginBody">
        <div className="loginCard" >
          <Welcome />
          <Login username={e => this.props.username(e)} login={() => this.props.login()} />
        </div>
      </div>
    );
  }
}
export default Body;