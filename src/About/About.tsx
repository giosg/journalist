import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import AboutCover from './AboutCover/AboutCover'

import './About.css';


class About extends Component {
  render() {
    return (
      <div>
        <AboutCover></AboutCover>
        <Container>
          <Row className="justify-content-md-center">
            <Col lg={8}>
              <Card>
                <Card.Body>
                  <h2 id="what-is-this">Generic data tool</h2>
                  <p>
                    Journalist is prototype tool created by Giosgs team refinery. Journalist is used for sending test events and querying and visualizing data from Giosgs Generic Reporting platform.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default About;
