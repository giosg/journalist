import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles/hljs';

import Container from 'react-bootstrap/Container';

interface EventPreviewProps {
  eventData: {[key: string]: any};
}

export default class EventPreview extends Component<any, EventPreviewProps> {
  render() {
    return (
      <Container>
        <pre>
          <SyntaxHighlighter language='json' style={github}>
            {JSON.stringify(this.props.eventData, Object.keys(this.props.eventData).sort(), 4)}
          </SyntaxHighlighter>
        </pre>
      </Container>
    );
  }
}
