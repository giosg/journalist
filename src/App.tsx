import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppHeader from './AppHeader/AppHeader'
import AppFooter from './AppFooter/AppFooter'
import ReportQuery from './ReportQuery/ReportQuery'
import SendEvents from './SendEvents/SendEvents'
import About from './About/About'

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <AppHeader></AppHeader>
            <Route path="/" component={About} exact={true} />
            <Route path="/query" component={ReportQuery} exact={true} />
            <Route path="/send" component={SendEvents} exact={true} />
            <AppFooter></AppFooter>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
