import React, { Component } from "react";
import Chart from "chart.js";
let linechart;

Chart.defaults.global.legend.display = false;

export default class LineChart extends Component {
  chartReference = React.createRef();
  componentDidMount() {
    this.buildChart();
  }
  componentDidUpdate() {
    this.buildChart();
  }
  buildChart = () => {
    const chartref = this.chartReference.current.getContext("2d");
    const data = this.props.data;
    const labels = this.props.labels;
    const title = this.props.title;
    if (typeof linechart !== "undefined") {
      linechart.destroy();
    }
    linechart = new Chart(chartref, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data
          }
        ]
      }
    });
  };
}
