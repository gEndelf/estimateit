import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Card, CardBlock } from 'reactstrap';
import ReactHighcharts from 'react-highcharts';

import Slider from '../Slider';

class LineChart extends Component {
  constructor(props) {
    super(props);

    this.getChart = this.getChart.bind(this);
    this.generateData = this.generateData.bind(this);
  }

  getChart(chartComponent) {
    if (chartComponent) {
      chartComponent.getChart();
    }
  }

  generateData() {
    const data = this.props.labels.sort((a, b) => a - b)
      .map((item, i) => [item, Math.round(((100 * i) / (this.props.labels.length - 1)) * 100) / 100]);
    this.config = {
      chart: {
        type: 'spline',
        inverted: false,
      },
      title: {
        text: 'Probability of project completing',
      },
      subtitle: {
        text: 'According to filled tasks and params',
      },
      xAxis: {
        title: {
          text: 'Hours',
        },
        labels: {
          formatter() {
            return `${this.value}h`;
          },
        },
        lineWidth: 2,
      },
      yAxis: {
        reversed: false,
        title: {
          enabled: true,
          text: 'Probability (Code Quality)',
        },
        labels: {
          formatter() {
            return `${this.value}%`;
          },
        },
        maxPadding: 0.05,
        showLastLabel: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x}h:  {point.y}%',
      },
      plotOptions: {
        spline: {
          marker: {
            enable: false,
          },
        },
      },
      series: [{
        name: 'Probability',
        data,
      }],
    };
  }

  render() {
    this.generateData();
    const {
      probabilityTime,
      userCanEditThisEstimate,
      calculateProbabilityTime,
    } = this.props;

    return (
      <Card>
        <CardBlock>
          <ReactHighcharts
            width="800"
            height="500"
            ref={this.getChart}
            config={this.config}
          />
        </CardBlock>
        <CardBlock>
          <Field
            title="Probability"
            component={Slider}
            probabilityTime={probabilityTime}
            name="estimateOptions.probability"
            disabled={!userCanEditThisEstimate}
            handleChange={calculateProbabilityTime}
          />
        </CardBlock>
      </Card>
    );
  }
}

LineChart.propTypes = {
  probabilityTime: PropTypes.number.isRequired,
  userCanEditThisEstimate: PropTypes.bool.isRequired,
  calculateProbabilityTime: PropTypes.func.isRequired,
};

export default LineChart;
