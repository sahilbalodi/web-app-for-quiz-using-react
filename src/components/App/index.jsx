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
      topScorers: [],
    };
  }
  page2() {
    const respons = this.state.responses;
    const display = [];
    let flag = 0;
    let temp = [];
    const { questions } = this.state;
    for (let i = 0; i < questions.length; i += 1) {
      temp = [];
      display.push(<div className="page2-questionNo">{`Question ${i + 1}`}</div>);
      display.push(<div className="page2-question">{questions[i].question}</div>);
      for (let j = 0; j < questions[i].options.length; j += 1) {
        for (let k = 0; k < respons.length; k += 1) {
          if ((questions[i].questionId === respons[k].questionId)
           && (questions[i].options[j] === respons[k].response)) {
            temp.push(<div><input name={questions[i].question} id={questions[i].questionId} onChange={e => this.textChange(e)} value={questions[i].options[j]} key={new Date()} type="radio" checked />{questions[i].options[j]}<br /></div>);
            flag = 1;
            break;
          }
        }
        if (flag !== 1) {
          temp.push(<div><input name={questions[i].question} id={questions[i].questionId} onChange={e => this.textChange(e)} value={questions[i].options[j]} key={new Date()} type="radio" />{questions[i].options[j]}<br /></div>);
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
    const { id } = e.target;
    const { name } = this.state;
    console.log(respon, id, name);
    axios.post('/changeResponse', {
      name,
      questionId: id,
      response: respon,
    })
      .then((responseForChangeRequest) => {
        axios.post('/user/login', {
          name: this.state.name,
        })
          .then((response) => {
            this.setState({ responses: response.data });
          });
        console.log(responseForChangeRequest);
      });
  }
  login() {
    if (this.state.name === null || undefined) {
      alert('enter name');
      return;
    }
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
    if (this.state.responses.length === this.state.questions.length) {
      axios.post('/calculateScore', {
        name: this.state.name,
      }).then((responseForSumRequest) => {
        axios.get('/topScorers').then((topScorers) => {
          this.setState({ topScorers, page: 2, score: responseForSumRequest.data });
        });
      });
    } else {
      alert('attempt all questions');
    }
  }
  username(e) {
    const name = e.target.value;
    this.setState({ name });
  }
  playAgain() {
    this.setState({
      page: 0,
      name: null,
      questions: [],
      responses: [],
      score: 0,
      topScorers: [],
    });
  }
  topScorers() {
    axios.get('/topScorers').then((topScorers) => {
      this.setState(topScorers);
    });
  }
  displayTopScorers() {
    const topScorers = this.state.topScorers.data;
    const scorers = [];
    for (let i = 0; i < topScorers.length; i += 1) {
      scorers.push(<div ><span className="App-leaderBoard"><span className="App-number">{i + 1}.</span><span className="App-name" >{`${topScorers[i].name}`}</span><span className="App-score">{topScorers[i].score}</span></span></div>);
    }
    return scorers;
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
        <div className="page2">
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
      <div className="page3">
        <Header value="Quizzy" name={`Hello ${this.state.name}`} />
        <p className="page3-yourscore">YOUR SCORE</p>
        <span className="page3-score">{this.state.score}</span><span className="page3-total">/{this.state.questions.length}</span>
        <div className="leaderBoardCard">
          <div className="page3-leaderBoard">LeaderBoard</div>
          <div>{this.displayTopScorers()}</div>
          <button
            className="page3-button"
            onClick={() => {
          this.playAgain();
          }}
          >Play again
          </button>
        </div>
      </div>
    );
  }
}
export default App;
