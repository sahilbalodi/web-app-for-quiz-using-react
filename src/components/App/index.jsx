import React, { Component } from 'react';
import axios from 'axios';
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
    }, () => {
      axios.post('/user/login', {
        name: this.state.name,
      })
        .then((response) => {
          this.setState({ responses: response.data });
          axios.get('/readQuestion')
            .then((responseOfQuestions) => {
              this.setState({ questions: responseOfQuestions.data });
            });
        });
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
    } else if (this.state.page === 1) {
      const display = [];
      let temp = [];
      const questions = this.state.questions;
      for (let i = 0; i < questions.length; i += 1) {
        temp = [];
        display.push(<div className="page2-questionNo">{`Question ${i + 1}`}</div>);
        display.push(<div className="page2-question">{questions[i].question}</div>);
        for (let j = 0; j < questions[i].options.length; j += 1) {
          temp.push(<div><input name={questions[i].question} value={questions[i].options[j]} type="radio" />{questions[i].options[j]}<br /></div>);
        }
        display.push(<form className="page2-form">{temp}</form>);
      }
      console.log(questions);
      return (
        <div>
          <Header value="Quizzy" name={`Hello ${this.state.name}`} />
          <div className="Quizcards">{display}</div>
          <button >calculate</button>
        </div>
      );
    }

    return (
      <p>{this.state.name}{this.state.page}</p>
    );
  }
}
export default App;
