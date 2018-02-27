import React from 'react';
import './Welcome.css';

class Welcome extends React.Component {
  render() {
    return (
      <div className="Welcome">
        <p className="Welcome-welcome">Welcome</p>
        <p className="Welcome-to">to</p>
        <p className="Welcome-Quizzy">Quizzy!</p>
      </div>
    );
  }
}
export default Welcome;
