import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="loginHeader">{this.props.value}</header>
    );
  }
}
export default Header;
