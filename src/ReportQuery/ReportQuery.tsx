import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './ReportQuery.css';

class ReportQuery extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                This is some text within a card body.
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                This is some text within a card body.
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReportQuery;
