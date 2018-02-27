import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="loginHeader">{this.props.value}<div className="Header-Name">{this.props.name}</div></header>
    );
  }
}
export default Header;
