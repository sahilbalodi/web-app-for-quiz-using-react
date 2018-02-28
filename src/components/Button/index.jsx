import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

class Button extends React.Component {
  render() {
    return (
      <input type="button" className="login-button" value="Login" onClick={() => this.props.onClick()} />
    );
  }
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
export default Button;
