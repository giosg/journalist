import React, { Component } from 'react';

import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import QueryForm from './QueryForm/QueryForm';

import JsonPreview from './ResponsePreview/ResponsePreview';

import axios from 'axios';

import './ReportQuery.css'

import { ToastContainer, toast } from 'react-toastify';

interface ReportQueryProps {
  onInputChange: Function;
  initialEventData: any;
}

interface ReportQueryState {
  currentQuery: any;
  responseData: any;
  token: string;
  queryViewModalVisible: boolean;
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
        sources: ["untrusted"],
        interval: {
          "start": startDate.toISOString(),
          "end": endDate.toISOString()
        },
        granularity: "day",
        group_by: [],
        organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
        vendor: "com.giosg.journalist",
        aggregations: [],
        filters: {
        }
      },
      responseData:{ },
      token: "",
      queryViewModalVisible: false,
    };
  }

  onFormChange = (currentQuery: any, token: string = this.state.token) => {
    this.setState({
      currentQuery: currentQuery,
      token: token
    });
    console.log(this.state.currentQuery)
  }

  onModalViewVisibilityChange = () => {
    this.setState({
      queryViewModalVisible: !this.state.queryViewModalVisible,
    });
  }

  onQuery = () => {
    let self = this;
    let apiBaseUrl = 'https://api.giosg.com/api/events/v1';
    let apiUrlEnding = '/orgs/' + this.state.currentQuery.organization_id + '/fetch'
    let headers = {
      headers: {
      "Authorization" : this.state.token,
      "Content-Type": "application/json"
      }
    }
    axios.post(apiBaseUrl + apiUrlEnding, this.state.currentQuery, headers=headers)
    .then(function (response: any) {
        console.log(response)
        self.setState({
          responseData: response['data'],
        })
      })
      .catch(function (error: any) {
        toast.error("Query failed!", {
          position: toast.POSITION.TOP_LEFT
        });
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
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Query preview
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <JsonPreview jsonData={this.state.currentQuery}/>
          </Modal.Body>
        </Modal>
        <ToastContainer autoClose={5000} hideProgressBar={true}/>
        <Row>
          <Col sm>
          <QueryForm onInputChange={this.onFormChange} initialQueryData={this.state.currentQuery} token={this.state.token}/>
          </Col>
          <Col sm>
          <JsonPreview jsonData={this.state.responseData}/>
          </Col>
        </Row>
        <Button variant='primary' type='button' onClick={this.onQuery}>
          Execute query
        </Button>
        <Button style={{marginLeft: 10}} variant="info" onClick={this.onModalViewVisibilityChange}>Preview query</Button>

      </Container>
    );
  }
}

export default ReportQuery;
