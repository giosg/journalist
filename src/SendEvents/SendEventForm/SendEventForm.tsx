import React, { Component, SyntheticEvent } from 'react';

import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { ReplaceProps, BsPrefixProps } from 'react-bootstrap/helpers';
import './SendEventForm.css';


interface GenericEventPayload {
  event_version: number;
  category: string;
  action: string;
  label?: string;
  vendor: string;
  organization_id: string;
  timestamp: string;
  properties: string[];
  value: number;
}

interface SendEventFormState {
  event: GenericEventPayload;
};

class SendEventForm extends Component<{}, SendEventFormState> {
  state = {
    event: {
      event_version: 1,
      timestamp: new Date().toISOString(),
      organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
      vendor: "com.giosg.journalist",
      category: "test-event",
      label: "this-is-test",
      properties: [],
      action: "test-sending",
      value: 1,
    }
  };

  constructor(props: any) {
    super(props);
    // this.state = {
    //   event: {
    //     event_version: 1,
    //     timestamp: "2019-01-30T16:32:17.879Z",
    //     organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
    //     vendor: "com.giosg.journalist",
    //     category: "test-event",
    //     label: "this-is-test",
    //     properties: [],
    //     action: "test-sending",
    //     value: 1,
    //   }
    // };
  }

  onSendEventClick() {
    let eventData: GenericEventPayload = this.state.event;

    let apiUrl = 'https://api.giosg.com/events/v1/store/untrusted';
    axios.post(apiUrl, eventData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onGenerateOrgIdClick() {
    console.log("Should generate org id...");
  };

  //onEventVersionChange(event: React.ChangeEvent<HTMLInputElement>) {
  onEventVersionChange = (event: any) => {
    if (!event) {
      return;
    }

    let eventData = {...this.state.event};
    eventData.event_version = parseInt(event.target.value);
    this.setState({
      event: eventData
    });

    this.onInputChange();
  };

  onInputChange() {
    console.log("Should refresh the preview on right side..");
  };

  render() {
    return (
      <Form>
        <Form.Group controlId="formEventVersion">
          <Form.Label>Event version</Form.Label>
          <Form.Control type="number" placeholder="Numeric event version" value={this.state.event.event_version.toString()} onChange={this.onEventVersionChange} />
          <Form.Text className="text-muted">
            <strong>event_version:</strong> used to specify version of event in case you ever want to change it.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formVendor">
          <Form.Label>vendor</Form.Label>
          <Form.Control type="text" placeholder="vendor" />
          <Form.Text className="text-muted">
            <strong>event_version:</strong> used to specify version of event in case you ever want to change it.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formOrganizationId">
          <Form.Label>organization_id</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control type="text" placeholder="organization_id" />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.onGenerateOrgIdClick.bind(this)}>Generate</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>category</Form.Label>
          <Form.Control type="text" placeholder="category" />
        </Form.Group>

        <Form.Group controlId="formLabel">
          <Form.Label>label</Form.Label>
          <Form.Control type="text" placeholder="label" />
        </Form.Group>

        <Form.Group controlId="formAction">
          <Form.Label>action</Form.Label>
          <Form.Control type="text" placeholder="action" />
        </Form.Group>

        <Form.Group controlId="formAction">
          <Form.Label>value</Form.Label>
          <Form.Control type="text" placeholder="value" />
        </Form.Group>

        <Form.Group controlId="formProperties">
          <Form.Label>properties</Form.Label>
          <Form.Control type="text" placeholder="properties" />
        </Form.Group>

        <Form.Group controlId="formBasicChecbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="button" onClick={this.onSendEventClick.bind(this)}>
          Send event
        </Button>
      </Form>
    );
  };
}

export default SendEventForm;
