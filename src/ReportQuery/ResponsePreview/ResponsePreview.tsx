import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './ResponsePreview.css';

interface QueryFormProps {
   responseData: any;
}
interface QueryFormState {

}

class QueryForm extends Component<QueryFormProps, QueryFormState> {

  render() {
    return (
      <Container>
          <Card style={{minHeight: 250}}>
          <pre>{JSON.stringify(this.props.responseData, null, 2) }</pre>
          </Card>
      </Container>
    );
  }
}

export default QueryForm;
