import React, { Component } from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';

import AppHeader from './AppHeader/AppHeader'
import AppFooter from './AppFooter/AppFooter'
import ReportQuery from './ReportQuery/ReportQuery'
import SendEvents from './SendEvents/SendEvents'
import About from './About/About'
import { createBrowserHistory } from 'history';

import './App.css';

class App extends Component {
  history: any;

  constructor(props: any) {
    super(props);
    this.history = createBrowserHistory();
  }

  render() {
    return (
      <Router history={this.history}>
        <div className="App">
            <AppHeader></AppHeader>
            <Route path="/" component={About} exact={true} />
            <Route path="/query" component={ReportQuery} exact={true} />
            <Route path="/send" component={SendEvents} exact={true} />
            <AppFooter></AppFooter>
        </div>
      </Router>
    );
  }
}

export default App;
