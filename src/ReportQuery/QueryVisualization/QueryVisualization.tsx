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
    let tickTotal = 1;
    if(Object.keys(this.props.data).length > 0) {
      let lineSeries = [];
      let dataLagends = [];
      for (const [ key, value ] of Object.entries(this.props.data)) {
        lineSeries.push(<LineSeries animation key={key} data={value as LineSeriesPoint[]}></LineSeries>)
        dataLagends.push(key);
        tickTotal = this.props.data[key].length
      }
      if(tickTotal > 30) {
        tickTotal = 30
      }
      return (
        <div className="visualize">
          <XYPlot
          margin={{bottom: 50}}
          height={600}
          width={1200}
          xType="time">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickTotal={tickTotal} tickLabelAngle={-90}/>
            <YAxis />
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