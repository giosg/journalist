import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './JsonPreview.css';

interface JsonPreviewProps {
   jsonData: any;
}
interface JsonPreviewPropsState {

}

class JsonPreview extends Component<JsonPreviewProps, JsonPreviewPropsState> {

  render() {
    if(Object.keys(this.props.jsonData).length > 0) {
      return (
        <Card style={{minHeight: 400, maxHeight: 800, justifyContent: 'center'
        }}>
            <pre>{JSON.stringify(this.props.jsonData, null, 2) }</pre>
        </Card>
      );
    }
    return (
      <Container>
      </Container>

    )
  }
}

export default JsonPreview;
