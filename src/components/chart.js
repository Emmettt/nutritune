import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Bar, Line } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

import './chart.css';

defaults.global.defaultFontColor = '#ccc';
defaults.global.defaultFontSize = 13;

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'Line'
    };
    this.dP = [];
    this.dF = [];
    this.dC = [];
    this.labels = [];
    this.data = {
      labels: this.labels,
      datasets: [
        {
          label: 'Белки',
          fill: false,
          lineTension: 0.4,
          backgroundColor: 'rgba(50,180,50,1)',
          borderColor: 'rgba(50,180,50,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(50,180,50,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(50,180,50,1)',
          pointHoverBorderColor: 'rgba(50,180,50,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dP
        },
        {
          label: 'Жиры',
          fill: false,
          lineTension: 0.4,
          backgroundColor: 'rgba(200,50,50,1)',
          borderColor: 'rgba(200,50,50,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(200,50,50,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(200,50,50,1)',
          pointHoverBorderColor: 'rgba(200,50,50,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dF
        },
        {
          label: 'Углеводы',
          fill: false,
          lineTension: 0.4,
          backgroundColor: 'rgba(50,50,200,1)',
          borderColor: 'rgba(50,50,200,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(50,50,200,1)',
          pointBackgroundColor: 'rgba(50,50,200,1)',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(50,50,200,1)',
          pointHoverBorderColor: 'rgba(50,50,200,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.dC
        }
      ]
    };
    this.options = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.dP = [...nextProps.chartData.dataSetP];
    this.dF = [...nextProps.chartData.dataSetF];
    this.dC = [...nextProps.chartData.dataSetC];
    this.labels = [...nextProps.chartData.labels];

    this.data.datasets[0].data = this.dP;
    this.data.datasets[1].data = this.dF;
    this.data.datasets[2].data = this.dC;
    this.data.labels = this.labels;
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  render() {
    return (
      <div className="chartWrapper">
        <div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Line"
                checked={this.state.selectedOption === 'Line'}
                onChange={this.handleOptionChange}
              />
              Lines
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Bar"
                checked={this.state.selectedOption === 'Bar'}
                onChange={this.handleOptionChange}
              />
              Bars
            </label>
          </div>
        </div>
        {this.state.selectedOption === 'Line' && (
          <Line data={this.data} optiions={this.options} />
        )}
        {this.state.selectedOption === 'Bar' && (
          <Bar data={this.data} options={this.options} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.chartData
  };
}

export default connect(
  mapStateToProps,
  null
)(LineChart);
