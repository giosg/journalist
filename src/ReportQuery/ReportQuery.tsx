import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import QueryForm from './QueryForm/QueryForm';

import QueryResponse from './QueryResponse/QueryResponse';

import './ReportQuery.css';

interface ReportQueryProps {
  onInputChange: Function;
  initialEventData: any;
}

interface ReportQueryState {
  currentQuery: any;
  responseData: any;
};

class ReportQuery extends Component<ReportQueryProps, ReportQueryState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentQuery:
      {
        event_version: 1,
        timestamp: new Date().toISOString(),
        organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
        vendor: "com.giosg.journalist",
        category: "test-event",
        label: "this-is-test",
        properties: ["test-property"],
        action: "test-sending",
        value: 1,
      },
      responseData:
        [
          {
            event_version: 1,
            timestamp: new Date().toISOString(),
            organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
            vendor: "com.giosg.journalist",
            category: "test-event",
            label: "this-is-test",
            properties: ["test-property"],
            action: "test-sending",
            value: 1,
          }
        ]
    };
  }

  onFormChange = (responseData: any) => {
    this.setState({
      responseData: responseData
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col lg={5}>
          <QueryForm onInputChange={this.onFormChange} initialQueryData={this.state.currentQuery} />
          </Col>
          <Col lg={7}>
          <QueryResponse responseData={this.state.responseData}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReportQuery;
