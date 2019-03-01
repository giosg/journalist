import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles/hljs';

import Container from 'react-bootstrap/Container';

import './JsonPreview.css';

interface JsonPreviewProps {
   jsonData: any;
   titleText: string;
}
interface JsonPreviewState {

}

class JsonPreview extends Component<JsonPreviewProps, JsonPreviewState> {

  render() {
    if(Object.keys(this.props.jsonData).length > 0) {
      return (
        <Container style={{flex: 1, justifyContent: 'center'}}>
          <h3>{this.props.titleText}</h3>
          <SyntaxHighlighter language='json' style={github}>
            {JSON.stringify(this.props.jsonData, null, 4) }
          </SyntaxHighlighter>
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
