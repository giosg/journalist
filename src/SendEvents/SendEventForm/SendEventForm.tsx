import React, { Component } from 'react';
const moment = require('moment');

import axios from 'axios';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import './SendEventForm.css';


export interface GenericEventPayload {
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

interface SendEventFormProps {
  onInputChange: Function;
  initialEventData: GenericEventPayload;
}

interface SendEventFormState {
  eventData: GenericEventPayload;
};

export class SendEventForm extends Component<SendEventFormProps, SendEventFormState> {

  constructor(props: SendEventFormProps) {
    super(props);
    this.state = {
      eventData: {
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
    };
  }

  onFormChange = (eventData: GenericEventPayload) => {
    this.setState({
      eventData: eventData
    });
  }

  onSendEventClick = () => {
    let apiUrl = 'https://api.giosg.com/events/v1/store/untrusted';
    axios.post(apiUrl, this.state.eventData)
      .then(function (response) {
        console.log(response);
        toast.success("Event sent succesfully!", {
          position: toast.POSITION.TOP_RIGHT
        });
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Sending event failed!", {
          position: toast.POSITION.TOP_LEFT
        });
      });
  };

  onGenerateOrgIdClick = () => {
    var eventData = {...this.state.eventData}
    eventData.organization_id = 'rölö';
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onEventVersionChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.event_version = parseInt(event.target.value);
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onTimestampChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.timestamp = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onVendorChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.vendor = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onOrganizationIdChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.organization_id = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onCategoryChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.category = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onLabelChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.label = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onActionChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.action = event.target.value;
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onValueChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.value = parseFloat(event.target.value);
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };
  onPropertiesChange = (event: any) => {
    const eventData = {...this.state.eventData};
    eventData.properties = event.target.value.split(',');
    this.setState({eventData});
    this.props.onInputChange(eventData);
  };

  getValidationState = (value: any, fieldType: 'string'|'number'|'timestamp'): string => {
    if (fieldType === 'number' && parseFloat(value) !== NaN) {
      return 'success';
    } else if (fieldType === 'string') {
      return 'success';
    } else if (fieldType === 'timestamp' && moment(value).isValid()) {
      return 'success';
    }
    return 'error';
  };

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>action</Form.Label>
          <Form.Control type='text' placeholder='action' value={this.state.eventData.action} onChange={this.onActionChange} />
          <Form.Text className='text-muted'>
            The action of the event, e.g. "created".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>category</Form.Label>
          <Form.Control type='text' placeholder='category' value={this.state.eventData.category} onChange={this.onCategoryChange} />
          <Form.Text className='text-muted'>
            The category of the event, e.g. "widget".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>event_version</Form.Label>
          <Form.Control type='number' placeholder='Numeric event version' value={this.state.eventData.event_version.toString()} onChange={this.onEventVersionChange} />
          <Form.Text className='text-muted'>
            The version of the event schema, e.g. 1.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>label</Form.Label>
          <Form.Control type='text' placeholder='label' value={this.state.eventData.label} onChange={this.onLabelChange} />
          <Form.Text className='text-muted'>
            The label of the event, e.g. "widget-5746".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>organization_id</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control type='text' placeholder='organization_id' value={this.state.eventData.organization_id} onChange={this.onOrganizationIdChange} />
            <InputGroup.Append>
              <Button variant='outline-secondary' onClick={this.onGenerateOrgIdClick}>Generate</Button>
            </InputGroup.Append>
          </InputGroup>
          <Form.Text className='text-muted'>
            The id of the organization which owns the event, e.g. "3bfed5a4-0353-4c56-887c-56a08b3883ab".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>properties</Form.Label>
          <Form.Control type='text' placeholder='properties (, as divider)' value={this.state.eventData.properties.join(',')} onChange={this.onPropertiesChange} />
          <Form.Text className='text-muted'>
            The properties of the event, e.g. "campaign,targeted". Each value separated with "," is considered as a separate property.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>timestamp</Form.Label>
          <Form.Control type='text' placeholder='timestamp' value={this.state.eventData.timestamp} onChange={this.onTimestampChange} />
          <Form.Text className='text-muted'>
            The timestamp of the event in ISO8601 format, e.g. "2019-01-01T00:00:00Z".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>value</Form.Label>
          <Form.Control type='text' placeholder='value' value={this.state.eventData.value.toString()} onChange={this.onValueChange} />
          <Form.Text className='text-muted'>
            The value of the event, e.g. "35.2". Is converted to float before sending.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>vendor</Form.Label>
          <Form.Control type='text' placeholder='vendor' value={this.state.eventData.vendor} onChange={this.onVendorChange} />
          <Form.Text className='text-muted'>
            The sender of the events, e.g. "interaction-designer".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Check type='checkbox' label='Checkbox' />
        </Form.Group>
        <Button variant='primary' type='button' onClick={this.onSendEventClick}>
          Send event
        </Button>
      </Form>
    );
  };
}
