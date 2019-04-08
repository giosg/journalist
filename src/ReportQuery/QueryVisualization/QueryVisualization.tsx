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
      try {
        return { title: serieNames[index], value: d.y };
      } catch(ex) {
        return {title: serieNames[index], value: 0}
      }
    });
  };
  getFirstDefinedPoint = (pointData: LineMarkSeriesPoint[]) => {
    for(let item in pointData) {
      if(pointData[item]){
        return pointData[item];
      }
    }
  }
  getFormattedTooltipTitle = (pointData: LineMarkSeriesPoint[]) => {
    const item: any = this.getFirstDefinedPoint(pointData);
    return { title: "Date", value: moment(item.x).format("lll") };
  };

  render() {
    const hasData = Object.keys(this.props.data).length > 0;
    const crosshairValues = this.state.crosshairValues;
    if (hasData) {
      return (
        <div className="visualize">
          <FlexibleXYPlot height={300} xType="ordinal" margin={{bottom: 80, left: 50}}
 onMouseLeave={() => this.setState({crosshairValues: []})}>
            <XAxis tickLabelAngle={-45} tickSize={10} />
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