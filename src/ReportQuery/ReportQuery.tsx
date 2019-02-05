import React, { Component } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';

import QueryForm from './QueryForm/QueryForm';

import ResponsePreview from './ResponsePreview/ResponsePreview';

import axios from 'axios';

import './ReportQuery.css';

import { ToastContainer, toast } from 'react-toastify';

interface ReportQueryProps {
  onInputChange: Function;
  initialEventData: any;
}

interface ReportQueryState {
  currentQuery: any;
  responseData: any;
  token: string;
};

class ReportQuery extends Component<ReportQueryProps, ReportQueryState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentQuery:
      {
        sources: ["untrusted"],
        interval: {
          "start": new Date().toISOString(),
          "end": new Date().toISOString()
        },
        granularity: "day",
        group_by: [],
        organization_id: "3bfed5a4-0353-4c56-887c-56a08b3883ab",
        vendor: "com.giosg.journalist",
        aggregations: ["sum"],
        filters: {
          type: "and",
          fields: [
              {"type": "selector", "dimension": "category", "value": "widget"},
              {"type": "selector", "dimension": "action", "value": "impression"}
          ]
      }
      },
      responseData:{ },
      token: "",
    };
  }

  onFormChange = (currentQuery: any, token: string = this.state.token) => {
    this.setState({
      currentQuery: currentQuery,
      token: token
    })
    console.log(this.state.currentQuery)
  }
  onQuery = () => {
    let self = this;
    let apiUrl = 'https://api.giosg.com/events/v1/fetch/';
    let headers = {
      headers: {
      "Authorization" : this.state.token
      }
    }
    axios.post(apiUrl, this.state.currentQuery, headers=headers)
    .then(function (response: any) {
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
        <ToastContainer autoClose={5000} hideProgressBar={true}/>
        <Row>
          <Col lg={5}>
          <QueryForm onInputChange={this.onFormChange} initialQueryData={this.state.currentQuery} token={this.state.token}/>
          </Col>
          <Col lg={7}>
          <ResponsePreview responseData={this.state.currentQuery}/>
          </Col>
        </Row>
        <Button variant='primary' type='button' onClick={this.onQuery}>
          Execute query
        </Button>
      </Container>
    );
  }
}

export default ReportQuery;
