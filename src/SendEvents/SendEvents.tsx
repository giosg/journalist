import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { SendEventForm, GenericEventPayload } from './SendEventForm/SendEventForm'
import EventPreview from './EventPreview/EventPreview'
import { ToastContainer } from 'react-toastify';
import './SendEvents.css';
import 'react-toastify/dist/ReactToastify.css';
import JsonPreview from '../ReportQuery/JsonPreview/JsonPreview';

interface SendEventsState {
  eventData: GenericEventPayload;
}

class SendEvents extends Component<SendEventsState, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      eventData: {
        event_version: 1,
        organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
        vendor: "com.giosg.journalist",
        category: "test-event",
        label: "this-is-test",
        properties: ["test-property"],
        action: "test-sending",
        value: 1,
      }
    };
  }

  onFormChange = (eventData: GenericEventPayload) => {
    this.setState({
      eventData: eventData
    });
  }

  render() {
    return (
      <Container>
        <ToastContainer autoClose={5000} hideProgressBar={true}/>
        <Row>
          <Col lg={5}>
            <SendEventForm initialEventData={this.state.eventData} onInputChange={this.onFormChange}></SendEventForm>
          </Col>
          <Col lg={7}>
            <JsonPreview jsonData={this.state.eventData as {[key: string]: any}} titleText="Request payload"></JsonPreview>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SendEvents;
