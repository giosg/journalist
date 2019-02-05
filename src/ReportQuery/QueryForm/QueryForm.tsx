import React, { Component } from 'react';
const moment = require('moment');

import { Form, InputGroup } from 'react-bootstrap';

import './QueryForm.css';

export interface GenericEventPayload {
  sources: string[];
  interval: any;
  granularity: string;
  group_by: string[];
  organization_id: string;
  vendor: string;
  aggregations: string[];
  filters: any;
}

interface QueryFormProps {
  onInputChange: Function;
  initialQueryData: GenericEventPayload;
  token: string;
}

interface QueryFormFormState {
  queryData: GenericEventPayload;
  token: string;
};

class QueryForm extends Component<QueryFormProps, QueryFormFormState> {

  constructor(props: QueryFormProps) {
    super(props);
    this.state = {
      queryData: props.initialQueryData,
      token: this.props.token,
    };
  }

  onStartChange = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.interval.start = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  };
  onEndChange = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.interval.end = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  };
  onVendorChange = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.vendor = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  };
  onOrganizationIdChange = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.organization_id = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  };
  onTokenChange = (event: any) => {
    const queryData = {...this.state.queryData};
    var token = event.target.value;
    this.setState({queryData: queryData, token: token});
    this.props.onInputChange(queryData, token);
  };
  onGranularityChange = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.granularity = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  };

  onGranularityPick = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.sources = event.target.value;
    this.props.onInputChange(queryData);
  }

  onSourcesPick = (event: any) => {
    var sources = (event.target.value === "all") ? ['trusted', 'untrusted'] : [event.target.value]
    const queryData = {...this.state.queryData};
    queryData.sources = sources;
    this.props.onInputChange(queryData);
  }
  onAggregationsPick = (event: any) => {
    var aggregations = []
    const queryData = {...this.state.queryData};
    let options = event.target.options
    for(var i = 0; i < 4; i++) {
      if(options[i].selected) {
        aggregations.push(options[i].value)
      }
    }
    queryData.aggregations = aggregations;
    this.props.onInputChange(queryData);
  }
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
          <Form.Label>Source</Form.Label>
          <Form.Control as="select" onChange={this.onSourcesPick} defaultValue="untrusted">
            <option value="all">all</option>
            <option value="trusted"> trusted</option>
            <option value="untrusted">untrusted</option>
          </Form.Control>
          <Form.Text className='text-muted'>
            The sources used for querying events.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Token</Form.Label>
          <Form.Control type='text' onChange={this.onTokenChange} />
          <Form.Text className='text-muted' placeholder="abc5678d-10sf-8fj4-fm3m-3d3f3f432asd">
            Token is used for authorizating giosg backend.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Interval</Form.Label>
          <Form.Control type='text'
           value={this.state.queryData.interval.start} onChange={this.onStartChange} />
          <Form.Label>-</Form.Label>
          <Form.Control type='text'
           value={this.state.queryData.interval.end} onChange={this.onEndChange} />
          <Form.Text className='text-muted'>
            The interval used for querying events.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Organization id</Form.Label>
          <InputGroup className='mb-3'>
            <Form.Control type='text' placeholder='organization_id' value={this.state.queryData.organization_id} onChange={this.onOrganizationIdChange} />
          </InputGroup>
          <Form.Text className='text-muted'>
            The id of the organization which owns the event, e.g. "3bfed5a4-0353-4c56-887c-56a08b3883ab".
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Granularity</Form.Label>
          <Form.Control as="select" onChange={this.onGranularityPick} value={this.state.queryData.granularity}>
            <option value="second">second</option>
            <option value="minute"> minute</option>
            <option value="hour">hour</option>
            <option value="day">day</option>
            <option value="week">week</option>
          </Form.Control>
          <Form.Text className='text-muted'>
          The granularity used to aggregate events to selected duration buckets.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Aggregations</Form.Label>
          <Form.Control multiple as="select" onChange={this.onAggregationsPick}>
            <option value="Max">Max</option>
            <option value="Min">Min</option>
            <option value="Sum">Sum</option>
            <option value="Count">Count</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Vendor</Form.Label>
          <Form.Control type='text' placeholder='Vendor uuid' value={this.state.queryData.vendor} onChange={this.onVendorChange} />
          <Form.Text className='text-muted'>
            The source vendor of events.
          </Form.Text>
        </Form.Group>
      </Form>
    );
  };
}
export default QueryForm;