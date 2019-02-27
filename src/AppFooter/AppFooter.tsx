import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import './AppFooter.css';

class AppFooter extends Component {
  render() {
    return (
      <Navbar bg="light" fixed="bottom">
        <Nav className="ml-auto float-right">
          <Nav.Link href="https://developers.giosg.com/reporting_http_api.html" target="_blank">
            Generic Reporting documentation
          </Nav.Link>
        </Nav>

      </Navbar>
    );
  }
}

export default AppFooter;
