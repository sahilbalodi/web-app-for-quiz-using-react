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
      score: 0,
    };
  }
  page2() {
    const respons = this.state.responses;
    const display = [];
    let flag = 0;
    let temp = [];
    const questions = this.state.questions;
    for (let i = 0; i < questions.length; i += 1) {
      temp = [];
      display.push(<div className="page2-questionNo">{`Question ${i + 1}`}</div>);
      display.push(<div className="page2-question">{questions[i].question}</div>);
      for (let j = 0; j < questions[i].options.length; j += 1) {
        for (let k = 0; k < respons.length; k += 1) {
          if ((questions[i].questionId === respons[k].questionId) && (questions[i].options[j] === respons[k].response)) {
            temp.push(<div><input name={questions[i].question} id={questions[i].questionId} onChange={e => this.textChange(e)} value={questions[i].options[j]} key="" type="radio" checked />{questions[i].options[j]}<br /></div>);
            flag = 1;
            break;
          }
        }
        if (flag !== 1) {
          temp.push(<div><input name={questions[i].question} id={questions[i].questionId} onChange={e => this.textChange(e)} value={questions[i].options[j]} key="" type="radio" />{questions[i].options[j]}<br /></div>);
        }
        flag = 0;
      }
      console.log(temp);
      display.push(<form className="page2-form">{temp}</form>);
    }
    return display;
  }
  textChange(e) {
    const respon = e.target.value;
    const id = e.target.id;
    const name = this.state.name;
    console.log(respon, id, name);
    axios.post('/changeResponse', {
      name,
      questionId: id,
      response: respon,
    })
      .then((responseForChangeRequest) => {
        console.log(responseForChangeRequest);
      });
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
  CalculateSum() {
    axios.post('/calculateScore', {
      name: this.state.name,
    }).then((responseForSumRequest) => {
      console.log(responseForSumRequest.data);
      this.setState({ page: 2, score: responseForSumRequest.data });
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
      const display = this.page2();
      return (
        <div>
          <Header value="Quizzy" name={`Hello ${this.state.name}`} />
          <div className="Quizcards">{display}</div>
          <button
            className="page2-button"
            onClick={() => {
            this.CalculateSum();
            }}
          >Calculate
          </button>
        </div>
      );
    }
    return (
      <p>{this.state.score}</p>
    );
  }
}
export default App;
