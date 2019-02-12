import React, { Component } from 'react';

import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

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
  }

  onFormChange = (currentQuery: any, token: string = this.state.token) => {
    this.setState({
      currentQuery: currentQuery,
      token: token
    });
  }

  onModalViewVisibilityChange = () => {
    this.setState({
      queryViewModalVisible: !this.state.queryViewModalVisible,
    });
  }
  formVisualizationData = (data: any) => {
    var dataToVisualize: any = {};
    data['fields'].forEach((row: any, index: number)  => {
      if (index > 0 && row['type'] === "metric") {
        let aggregationToVisualize: any = [];
        data['data'].forEach((element: any) => {
          var timestamp = new Date(element[0]).getTime();
          // Remove timestamp format by adding just element[0] which is iso time string
          aggregationToVisualize.push({'y': element[index], 'x': timestamp})
        });
        dataToVisualize[row['name']] = aggregationToVisualize;
      }
    });
    this.setState({
      dataToVisualize: dataToVisualize
    })
  }
  onQuery = () => {
    let self = this;
    let apiBaseUrl = 'https://api.giosg.com/api/events/v1';
    let apiUrlEnding = '/orgs/' + this.state.currentQuery.organization_id + '/fetch'
    let headers = {
      headers: {
      'Authorization' : this.state.token,
      'Content-Type': 'application/json'
      }
    }
    axios.post(apiBaseUrl + apiUrlEnding, this.state.currentQuery, headers=headers)
    .then(function (response: any) {
        self.setState({
          responseData: response['data'],
          modalClass: "alert-success"
        })
        self.formVisualizationData(response['data']);
      })
      // .catch(function (error: any) {
      //   self.setState({
      //     responseData: error["response"],
      //     modalClass: "alert-danger"
      //   })
      //   toast.error('Query failed!', {
      //     position: toast.POSITION.TOP_LEFT
      //   });
      // })
      .finally(function(){
        if(self.state.responseData){
          self.onModalViewVisibilityChange();

        }
      })
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
              Response preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={this.state.modalClass}>
            <JsonPreview jsonData={this.state.responseData}/>
          </Modal.Body>
        </Modal>
        <ToastContainer autoClose={5000} hideProgressBar={true}/>
        <Row>
          <Col sm>
          <QueryForm onInputChange={this.onFormChange} initialQueryData={this.state.currentQuery} token={this.state.token}/>
          </Col>
          <Col sm>
            <JsonPreview jsonData={this.state.currentQuery}/>
          </Col>
        </Row>
        <Button variant='primary' type='button' onClick={this.onQuery}>
          Execute query
        </Button>
        <QueryVisualization data={this.state.dataToVisualize}></QueryVisualization>
      </Container>
    );
  }
}

export default ReportQuery;
