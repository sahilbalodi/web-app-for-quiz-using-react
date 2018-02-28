import React from 'react';
import PropTypes from 'prop-types';

import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="loginHeader">{this.props.value}<div className="Header-Name">{this.props.name}</div></header>
    );
  }
}
Header.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default Header;
