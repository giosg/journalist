/// <reference path="../../../typings/react-vis.d.ts"/>

import React, { Component } from 'react';
import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, LineSeriesPoint} from 'react-vis';
import Container from 'react-bootstrap/Container';

interface QueryVisualizationProps {
  data: any;
}
interface QueryVisualizationState {
  dataToVisualize: any,
}

class QueryVisualization extends Component<QueryVisualizationProps, QueryVisualizationState> {

  constructor(props: QueryVisualizationProps) {
    super(props);
    this.state = {
      dataToVisualize: this.props.data,
    };
  }
  render() {
    if(Object.keys(this.props.data).length > 0) {
      let lineSeries = [];
      for (const [ key, value ] of Object.entries(this.props.data)) {
        lineSeries.push(<LineSeries key={key} data={value as LineSeriesPoint[]}></LineSeries>)
      }

      return (
        <div className="visualize">
        <XYPlot height={500} width={1000}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
          {lineSeries}
        </XYPlot>

        </div>
      );
    }
    return (
      <Container>
      </Container>

    )
  }
}
export default QueryVisualization;