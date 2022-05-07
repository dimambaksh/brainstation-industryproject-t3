import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/LogIn/Login';
import Reserve from './pages/Reserve/Reserve';
import Quiz from './pages/Quiz/Quiz';
import Desks from './components/Desks/Desks';
import "./App.css";

class App extends React.Component {
  //once we have a backend authorized should be initialized to false
  state = {
    authorized: false,
    user: {},
    email: "",
    password: "",
  };

  logInListener = (event) => {
    event.preventDefault();
    console.log(event.target);
    this.setState({ [event.target.id]: event.target.value });
  };

  submitListener = (event) => {
    event.preventDefault();
    //axios login then
    //if valid set state {user: returned user object, authorized: true}
    this.setState({authorized: true});
    sessionStorage.setItem('loggedIn', `${this.state.email}`);
  }

  componentDidMount(){
    const username = sessionStorage.getItem('loggedIn');
    if(username != null){
      this.setState({authorized: true});
    }
  }

  render() {
    return (
      <div className="App">
        {/* If not logged in -> show the LogIn component*/}
        {this.state.authorized ? (
          <Router>
            <Switch>
              <Route exact path="/desks" component={Desks} />
              <Route exact path="/reserve" component={Reserve} />
              <Route path="/quiz" component={Quiz} />
              <Route component={Home} />
            </Switch>
          </Router>
        ) : (
          <Login
            email={this.state.email}
            password={this.setState.password}
            listener={this.logInListener}
            submitListener={this.submitListener}
          />
        )}
      </div>
    );
  }
}

export default App;
