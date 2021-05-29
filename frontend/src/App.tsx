import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react'
import registerPage from './pages/register';
import loginPage from './pages/login';
import gameBoard from './pages/game';
import Home from './pages/home';
import Room from './pages/room';
import Profil from './pages/profile'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={registerPage} />
          <Route path='/login' component={loginPage} />
          <Route path='/game' component={gameBoard} />
          <Route path='/profil' component={Profil} />
          <Route path='/room' component={Room} />
        </Switch>
      </Router>
    );
  }
}

export default App;
