import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Authentication from '../authwrapper';
import Home from '../home';
import User from '../user';
import Signup from '../signup';
import Signin from '../signin';
import Retrieve from '../retrieve';
import Info from '../userinfo';
import Nav from '../nav';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={Authentication(User)} />
          <Route path="/userinfo" component={Authentication(Info)} />
          <Route path="/retrieve" component={Authentication(Retrieve)} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Signin} />
        </main>
      </div>
    );
  }
}
