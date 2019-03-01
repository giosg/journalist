import React, { Component } from 'react';
import moment from 'moment';

import { Container, Row, Col, Button, Modal, ButtonToolbar } from 'react-bootstrap';

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
    startDate.setDate(startDate.getDate() -8)
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
        organization_id: '3bfed5a4-0353-4c56-887c-56a08b3883ab',
        vendor: 'com.giosg.journalist',
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

  setDataForVisualization = (data: any) => {
    var dataToVisualize: any = {};
    data['fields'].forEach((row: any, index: number)  => {
      if (index > 0 && row['type'] === "metric") {
        let aggregationToVisualize: any = [];
        data['data'].forEach((element: any) => {
          let value = element[index];
          if(!isFinite(value)) {
            value = 0.0;
          }
          var timestamp = new Date(element[0]);
          // Remove timestamp format by adding just element[0] which is iso time string
          aggregationToVisualize.push({
            'y': value,
            'x': moment(timestamp).format("YYYY-MM-DD")
          });
        });
        dataToVisualize[row['name']] = aggregationToVisualize;
      }
    });
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
        this.setState({
          responseData: response['data'],
          modalClass: ""
        })
        this.setDataForVisualization(response['data']);
      })
      .catch((error: any) => {
        this.setState({
          responseData: error["response"],
          modalClass: "alert-danger"
        })
        toast.error('Query failed!', {
          position: toast.POSITION.TOP_LEFT
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  onQueryClick = () => {
    this.executeQuery();
  };

  onQueryAndVisualizeClick = () => {
    this.executeQuery().then(() => {
      if (this.state.dataToVisualize) {
        this.onModalViewVisibilityChange();
      };
    });
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
          </Col>
          <Col sm>
            <JsonPreview jsonData={this.state.currentQuery} titleText="Request payload" />
            <JsonPreview jsonData={this.state.responseData} titleText="Response body" />
          </Col>
        </Row>
        <ButtonToolbar>
          <Button variant='primary' type='button' onClick={!this.state.isLoading ? this.onQueryClick : undefined} disabled={this.state.isLoading}>
            {this.state.isLoading ? 'Loading…' : 'Execute query'}
          </Button>
          <Button variant='primary' type='button' onClick={!this.state.isLoading ? this.onQueryAndVisualizeClick : undefined} disabled={this.state.isLoading}>
            {this.state.isLoading ? 'Loading…' : 'Execute and visualize'}
          </Button>
        </ButtonToolbar>
      </Container>
    );
  }
}

export default ReportQuery;
