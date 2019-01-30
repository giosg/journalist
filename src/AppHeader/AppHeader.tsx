import React, { Component } from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar } from 'react-bootstrap'

import './AppHeader.css';

class AppHeader extends Component {
  render() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="#home">Journalist</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <LinkContainer to="/">
              <Nav.Link>
                About
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/query">
              <Nav.Link>
                Query
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/send">
              <Nav.Link>
                Send
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppHeader;
