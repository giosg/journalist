import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SendEventForm from './SendEventForm/SendEventForm'

import './SendEvents.css';

class SendEvents extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={8}>
            <SendEventForm></SendEventForm>
          </Col>
          <Col lg={4}>
            Some stuff here
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SendEvents;
