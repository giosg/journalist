/// <reference path="../../../typings/react-vis.d.ts"/>

import React, { Component } from 'react';
import './QueryVisualization.css';
import moment from 'moment';
import {FlexibleXYPlot, DiscreteColorLegend, LineSeries, LineMarkSeries, VerticalGridLines, HorizontalGridLines, YAxis, XAxis, Crosshair, LineMarkSeriesPoint, RVNearestXData, AbstractSeriesPoint} from 'react-vis';
import Container from 'react-bootstrap/Container';


interface QueryVisualizationProps {
  data: any;
}
interface QueryVisualizationState {
  dataToVisualize: object;
  showTooltip?: LineMarkSeriesPoint;
  crosshairValues?: LineMarkSeriesPoint[]
}

class QueryVisualization extends Component<QueryVisualizationProps, QueryVisualizationState> {

  constructor(props: QueryVisualizationProps) {
    super(props);
    this.state = {
      showTooltip: undefined,
      dataToVisualize: this.props.data,
    };
    console.log(this.props.data);
  }

  getSeries(data: Object) {
    let series = [];
    for (const [ key, value ] of Object.entries(data)) {
      series.push(
        <LineMarkSeries key={key} data={value} onNearestX={this.onNearestX} />
      )
    }
    return series;
  };

  onNearestX = (value: LineMarkSeriesPoint, eventData: RVNearestXData<any>) => {
    //console.log(value);
    const index = eventData.index;
    //const crosshairValues: LineMarkSeriesPoint[] = []; // this.props.data.map((d: LineMarkSeriesPoint[]) => d[index])
    const crosshairValues = Object.keys(this.props.data).map((series_name: string) => {
      var a = this.props.data[series_name][index];
      return a;
    });
    this.setState({crosshairValues: crosshairValues});
  };

  getFormattedTooltipItem = (pointData: LineMarkSeriesPoint[]) => {
    const serieNames = Object.keys(this.props.data);
    return pointData.map((d: any, index: number) => {
      return { title: serieNames[index], value: d.y };
    });
  };

  getFormattedTooltipTitle = (pointData: LineMarkSeriesPoint[]) => {
    const item = pointData[0]
    return { title: "Date", value: moment(item.x).format("LL") };
  };

  render() {
    const hasData = Object.keys(this.props.data).length > 0;
    const crosshairValues = this.state.crosshairValues;
    if (hasData) {
      return (
        <div className="visualize">
          <FlexibleXYPlot height={300} xType="ordinal" onMouseLeave={() => this.setState({crosshairValues: []})}>
            <XAxis />
            <YAxis />
            <VerticalGridLines />
            <HorizontalGridLines />
            <DiscreteColorLegend orientation="horizontal" items={Object.keys(this.props.data)} />

            {this.getSeries(this.props.data)}

            {crosshairValues && <Crosshair values={crosshairValues} itemsFormat={this.getFormattedTooltipItem} titleFormat={this.getFormattedTooltipTitle} />}
          </FlexibleXYPlot>
        </div>
      );
    } else {
      return (
        <Container>
        </Container>
      )
    }
  }
}
export default QueryVisualization;