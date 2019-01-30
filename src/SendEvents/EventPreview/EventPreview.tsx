import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';

interface EventPreviewProps {
  eventData: {[key: string]: any};
}

export default class EventPreview extends Component<any, EventPreviewProps> {
  render() {
    return (
      <Container>
        <pre>
          <code>
            {JSON.stringify(this.props.eventData, Object.keys(this.props.eventData).sort(), 4)}
          </code>
        </pre>
      </Container>
    );
  }
}
