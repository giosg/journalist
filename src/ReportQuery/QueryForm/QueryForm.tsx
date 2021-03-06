import React, { Component } from 'react';
import moment from 'moment';

import { Form, InputGroup , Badge, Col, Dropdown, ButtonToolbar } from 'react-bootstrap';
import { Button } from '@giosg/ui-components';
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
  groupByItems: string[];
};

class QueryForm extends Component<QueryFormProps, QueryFormFormState> {

  constructor(props: QueryFormProps) {
    super(props);
    this.state = {
      queryData: props.initialQueryData,
      token: this.props.token,
      groupByItems: [],
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

  onGranularityPick = (event: any) => {
    const queryData = {...this.state.queryData};
    queryData.granularity = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }

  onSourcesPick = (event: any) => {
    var sources = (event.target.value === "all") ? ['trusted', 'untrusted'] : [event.target.value]
    const queryData = {...this.state.queryData};
    queryData.sources = sources;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }
  onAggregationsPick = (event: any) => {
    var aggregations = []
    const queryData = {...this.state.queryData};
    let options = event.target.options
    for(var i = 0; i < 4; i++) {
      if (options[i].selected) {
        aggregations.push(options[i].value)
      }
    }
    queryData.aggregations = aggregations;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }
  onGroupByPick = (event: any) => {
    var groupBy = [];
    const queryData = {...this.state.queryData};
    let options = event.target.options
    for(var i = 0; i < 9; i++) {
      if (options[i].selected) {
        groupBy.push(options[i].value)
      }
    }
    queryData.group_by = groupBy;
    this.setState({
      groupByItems: groupBy,
      queryData
    })
    queryData.group_by = groupBy;
    this.props.onInputChange(queryData);
  }
  addNewFilter = () => {
    let queryData = this.state.queryData;
    if (!queryData.filters['fields']) {
      queryData.filters = {
        type: 'and',
        fields: []
      }
    }
    if (queryData.filters['fields'].length < 11) {
      queryData.filters['fields'].push({type: "selector", dimension: "category", value: ""})
      this.setState({queryData});
      this.props.onInputChange(queryData);
    }
  }
  onTypeSelect = (index: number, event: any) => {
    let queryData = this.state.queryData;
    queryData.filters['fields'][index]['type'] = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }
  onValueSelect = (index: number, event: any) => {
    let queryData = this.state.queryData;
    queryData.filters['fields'][index]['value'] = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }
  onFieldSelect = (index: number, event: any) => {
    let queryData = this.state.queryData;
    queryData.filters['fields'][index]['dimension'] = event.target.value;
    this.setState({queryData});
    this.props.onInputChange(queryData);
  }
  removeLastFilter = () => {
    let queryData = this.state.queryData;
    if (queryData.filters['fields'].length === 1) {
      queryData.filters = {}
    } else {
      queryData.filters['fields'].shift();
    }
    this.setState({queryData});
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
    let filters = []
    if ("fields" in this.state.queryData.filters) {
      filters = this.state.queryData.filters['fields'].map((item: any, index: number) => (
        <div>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Type</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" onChange={(event: any) => {this.onTypeSelect(index, event)}}>
              <option key="select" value="select">selector</option>
              <option key="regex" value="regex">regex</option>
            </Form.Control>
          </InputGroup>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Field</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control as="select" onChange={(event: any) => {this.onFieldSelect(index, event)}} value={this.state.queryData.filters['fields'][index]['dimension']}>
              <option key="event_version" value="event_version">event_version</option>
              <option key="source" value="source">source</option>
              <option key="category" value="category">category</option>
              <option key="action" value="action">action</option>
              <option key="organization_id" value="organization_id">organization_id</option>
              <option key="properties" value="properties">properties</option>
              <option key="visitor_id" value="visitor_id">visitor_id</option>
              <option key="session_id" value="session_id">session_id</option>
              <option key="user_id" value="user_id">user_id</option>
              <option key="browser_name" value="browser_name">browser_name</option>
            </Form.Control>
          </InputGroup>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Value</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type='text' value={this.state.queryData.filters['fields'][index]['value']} onChange={(event: any) => {this.onValueSelect(index, event)}} />
            </InputGroup>
          </Form.Group>
        </div>
      ));
      }
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

        <Form.Label>Token</Form.Label>
        <Form.Group>
          <Form.Control type='text' onChange={this.onTokenChange} />
          <Form.Text className='text-muted' placeholder="abc5678d-10sf-8fj4-fm3m-3d3f3f432asd">
            Token is used for authorizating giosg backend.
          </Form.Text>
        </Form.Group>

        <Form.Label>Interval</Form.Label>
        <Form.Group>
          <Form.Row>

            <Form.Group as={Col}>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>Start</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='text' value={this.state.queryData.interval.start} onChange={this.onStartChange} />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col}>
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text>End</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type='text' value={this.state.queryData.interval.end} onChange={this.onEndChange} />
              </InputGroup>
            </Form.Group>

          </Form.Row>
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
            <option value="minute"> minute</option>
            <option value="hour">hour</option>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
          </Form.Control>
          <Form.Text className='text-muted'>
          The granularity used to aggregate events to selected duration buckets.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Aggregations</Form.Label>
          <Form.Control multiple as="select" onChange={this.onAggregationsPick}>
            <option key="max" value="max">Max</option>
            <option key="min" value="min">Min</option>
            <option key="sum" value="sum">Sum</option>
            <option key="count" value="count">Count</option>
          </Form.Control>
          <Form.Text className='text-muted' placeholder="abc5678d-10sf-8fj4-fm3m-3d3f3f432asd">
            Aggregations you want to perform. Use CTRL/CMD + click to select multiple.
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Vendor</Form.Label>
          <Form.Control type='text' placeholder='Vendor uuid' value={this.state.queryData.vendor} onChange={this.onVendorChange} />
          <Form.Text className='text-muted'>
            The source vendor of events.
          </Form.Text>
        </Form.Group>
        <Form.Group>

          <Form.Label>Group by</Form.Label>
          <Form.Row>
          {this.state.groupByItems.map(title => (
            <Badge key={title} variant="primary" id={title}>{title}</Badge>
          ))}
          </Form.Row>
          <Dropdown.Divider />
          <Form.Control multiple as="select" onChange={this.onGroupByPick}>
            <option key="event_version" value="event_version">event_version</option>
            <option key="source" value="source">source</option>
            <option key="category" value="category">category</option>
            <option key="action" value="action">action</option>
            <option key="label" value="label">label</option>
            <option key="organization_id" value="organization_id">organization_id</option>
            <option key="properties" value="properties">properties</option>
            <option key="visitor_id" value="visitor_id">visitor_id</option>
            <option key="session_id" value="session_id">session_id</option>
            <option key="user_id" value="user_id">user_id</option>
            <option key="browser_name" value="browser_name">browser_name</option>
          </Form.Control>
          <Form.Text className='text-muted'>
            Field used for groupping events by.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Filters</Form.Label>
          <Dropdown.Divider />
          {filters}
          <ButtonToolbar>
            <Button tone='positive' type='button' onClick={this.addNewFilter}>
              New filter
            </Button>
            <Button tone='negative' type='button' onClick={this.removeLastFilter}>
              Remove filter
            </Button>
          </ButtonToolbar>
          <Form.Text className='text-muted'>
            Filtering queryset.
          </Form.Text>
        </Form.Group>
      </Form>
    );
  };
}
export default QueryForm;