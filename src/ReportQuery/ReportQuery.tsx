import React, { Component } from 'react';
import moment from 'moment';

import { Container, Row, Col, Modal, ButtonToolbar } from 'react-bootstrap';
import { Button } from '@giosg/ui-components';
import QueryForm from './QueryForm/QueryForm';

import JsonPreview from './JsonPreview/JsonPreview';

import axios from 'axios';

import './ReportQuery.css'


import { ToastContainer, toast } from 'react-toastify';
import QueryVisualization from './QueryVisualization/QueryVisualization';

interface ReportQueryProps {
  onInputChange: Function;
  initialEventData: any;
}

interface ReportQueryState {
  isLoading: boolean;
  currentQuery: any;
  responseData: any;
  token: string;
  queryViewModalVisible: boolean;
  modalClass: string;
  dataToVisualize: any;
};

class ReportQuery extends Component<ReportQueryProps, ReportQueryState> {
  constructor(props: any) {
    super(props);
    let endDate = new Date();
    let startDate = new Date();
    startDate.setDate(startDate.getDate() -3)
    this.state = {
      isLoading: false,
      currentQuery:
      {
        sources: ['untrusted'],
        interval: {
          'start': startDate.toISOString(),
          'end': endDate.toISOString()
        },
        granularity: 'day',
        group_by: [],
        organization_id: 'a17cea80-e397-11e0-b51a-00163e0c01f2',//'3bfed5a4-0353-4c56-887c-56a08b3883ab',
        vendor: 'com.giosg.app.derby',
        aggregations: [],
        filters: {

        }
      },
      responseData:{},
      token: '',
      queryViewModalVisible: false,
      modalClass: "alert-success",
      dataToVisualize: {}
    };
  };

  onFormChange = (currentQuery: any, token: string = this.state.token) => {
    this.setState({
      currentQuery: currentQuery,
      token: token
    });
  };

  onModalViewVisibilityChange = () => {
    this.setState({
      queryViewModalVisible: !this.state.queryViewModalVisible,
    });
  };
  setZerosToUndefinedDates = (data: any, granularity: 'day'|'hour'|'week'|'month'|'year') => {
    let dateStart = moment(this.state.currentQuery.interval['start']);
    let dateEnd = moment(this.state.currentQuery.interval['end']);
    let stuff: any = [];
    while (dateEnd >= dateStart || dateStart.format('YYYY-MM-DD HH:mm') === dateEnd.format('YYYY-MM-DD HH:mm')) {
      let found = false;
      data.forEach((row: any, index: number)  => {
        if(row['x'] === dateStart.format('YYYY-MM-DD HH:00')) {
          stuff.push(row);
          found = true;
        }
      });
      if(!found) {
        stuff.push({'x': dateStart.format('YYYY-MM-DD HH:00'), 'y': 0});
      }
      dateStart.add(1, granularity);
    }
    return stuff;
  }
  getVisualizationByAggregation(data: any, dataToVisualize: any) {
    // Non groupby data visualization formatting
    data['fields'].forEach((row: any, index: number)  => {
      if (index > 0 && row['type'] === "metric") {
        let aggregationToVisualize: any = [];
        data['data'].forEach((element: any) => {
          let value = element[index];
          aggregationToVisualize.push({
            'y': value,
            'x': moment(element[0]).format("YYYY-MM-DD HH:00")
          });
        });
        dataToVisualize[row['name']] = aggregationToVisualize;
      }
    });
  }
  getGroupByVisualizationByAggregation(data: any, dataToVisualize: any, aggregationIndex: number) {
    // groupby data visualization formatting
    let fields: any = {}
    data['data'].forEach((element: any) => {
      let fieldName = ""
      data['fields'].forEach((row: any, index: number)  => {
        if (index > 0 && row['type'] === "dimension") {
          let value = element[index];
          fieldName = fieldName + value + "_";
        }
      });
      if(fieldName !== "") {
        fieldName = fieldName + data['fields'][aggregationIndex]['name'];
        if(!(fieldName in fields)) {
          fields[fieldName] = []
        }
        fields[fieldName].push({
          'y': element[aggregationIndex],
          'x': moment(element[0]).format("YYYY-MM-DD HH:00")
        });
      }
    });
    let isGroupByQuery = false;
    for (const [ key, value ] of Object.entries(fields)) {
      dataToVisualize[key] = this.setZerosToUndefinedDates(value, this.state.currentQuery.granularity);
      isGroupByQuery = true;
    }
    return isGroupByQuery;
  }
  setDataForVisualization = (data: any) => {
    var dataToVisualize: any = {};
    var isGroupByQuery = false;
    // format groupped by data
    data['fields'].forEach((row: any, index: number)  => {
      if (index > 0 && row['type'] === "metric") {
        isGroupByQuery = this.getGroupByVisualizationByAggregation(data, dataToVisualize, index);
      }
    });
    // if query type is not group by format not groupped by data
    if(!isGroupByQuery) {
      this.getVisualizationByAggregation(data, dataToVisualize);
    }
    this.setState({
      dataToVisualize: dataToVisualize
    })
  };

  executeQuery = () => {
    let apiBaseUrl = 'https://api.giosg.com/api/events/v1';
    let apiUrlEnding = '/orgs/' + this.state.currentQuery.organization_id + '/fetch'
    let headers = {
      headers: {
      'Authorization' : this.state.token,
      'Content-Type': 'application/json'
      }
    };
    this.setState({
      isLoading: true
    });
    return axios.post(apiBaseUrl + apiUrlEnding, this.state.currentQuery, headers=headers)
    .then((response: any) => {
        this.setDataForVisualization(response['data']);
        this.setState({
          responseData: response['data'],
          modalClass: ""
        })
      })
      .catch((error: any) => {
        toast.error('Query failed!', {
          position: toast.POSITION.TOP_LEFT,
        });
        this.setState({
          modalClass: "alert-error"
        })

      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  validateInput = () => {
    if(this.state.currentQuery.aggregations.length === 0) {
      toast.error('At least one aggregation is required', {
        position: toast.POSITION.TOP_LEFT
      });
      return false;
    }
    if(!moment(this.state.currentQuery.interval.start).isValid()) {
      toast.error('Start time is invalid', {
        position: toast.POSITION.TOP_LEFT
      });
      return false;
    }
    if(!moment(this.state.currentQuery.interval.end).isValid()) {
      toast.error('End time is invalid', {
        position: toast.POSITION.TOP_LEFT
      });
      return false;
    }
    return true;

  }

  onQueryClick = () => {
    if(this.validateInput()) {
      this.executeQuery();
    }
  };

  onQueryAndVisualizeClick = () => {
    if(this.validateInput()) {
      this.executeQuery().then(() => {
        if (this.state.dataToVisualize) {
          this.onModalViewVisibilityChange();
        };
      });
    }
  };

  render() {
    return (
      <Container>
          <Modal
            size="lg"
            show={this.state.queryViewModalVisible}
            onHide={this.onModalViewVisibilityChange}
            aria-labelledby="example-modal-sizes-title-lg"
          >
          <Modal.Header closeButton className={this.state.modalClass}>
            <Modal.Title id="example-modal-sizes-title-lg">
              Response visualized
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={this.state.modalClass}>
            <QueryVisualization data={this.state.dataToVisualize}></QueryVisualization>
          </Modal.Body>
        </Modal>
        <ToastContainer autoClose={5000} hideProgressBar={true}/>
        <Row>
          <Col sm>
            <QueryForm onInputChange={this.onFormChange} initialQueryData={this.state.currentQuery} token={this.state.token}/>
            <ButtonToolbar>
              <Button priority='primary' type='button' onClick={!this.state.isLoading ? this.onQueryClick : undefined} disabled={this.state.isLoading}>
                {this.state.isLoading ? 'Loading…' : 'Execute query'}
              </Button>
              <Button priority='primary' type='button' onClick={!this.state.isLoading ? this.onQueryAndVisualizeClick : undefined} disabled={this.state.isLoading || this.state.currentQuery.granularity === 'minute'}>
                {this.state.isLoading ? 'Loading…' : 'Execute and visualize'}
              </Button>
          </ButtonToolbar>
          </Col>
          <Col sm>
            <JsonPreview jsonData={this.state.currentQuery} titleText="Request payload" />
            <br/>
            <JsonPreview jsonData={this.state.responseData} titleText="Response body" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReportQuery;
