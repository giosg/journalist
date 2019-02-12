import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles/hljs';

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
        <Container style={{flex: 1, justifyContent: 'center'}}>
            <Card style={{minHeight: 500, maxHeight: 800}}>
            <SyntaxHighlighter language='json' style={github}>
              {JSON.stringify(this.props.jsonData, null, 4) }
            </SyntaxHighlighter>
            </Card>
        </Container>
      );
    }
    return (
      <Container>
      </Container>

    )
  }
}

export default JsonPreview;
