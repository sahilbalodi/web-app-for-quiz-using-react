import React, { Component } from 'react';
import Header from '../Header';
import Body from '../Body';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      name: null,
      questions: [],
      responses: [],
    };
  }
  login() {
    this.setState({
      name: this.state.name,
      page: 1,
    });
  }
  username(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  render() {
    if (this.state.page === 0) {
      return (
        <div className="LoginPage">
          <Header value="Quizzy" />
          <Body username={e => this.username(e)} login={() => this.login()} />
        </div>
      );
    }
    return (
      <p>{this.state.name}{this.state.page}</p>
    );
  }
}
export default App;
