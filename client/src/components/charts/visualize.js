import React, { Component } from "react";
import linechart from "./LineChart";
import axios from "axios";
import { Bar, Line, Pie, defaults } from "react-chartjs-2";
import update from "immutability-helper";
import { getCurrentUser } from "../../actions/authActions";

class Visualize extends Component {
  constructor() {
    super();
    this.state = {
      commentToPredict: "test",
      errors: {},
      predictionResult: "Microsoft office",
      chartDataPoints: {},
      chartDatagram: {
        labels: ["edge", "excel"],
        datasets: [
          {
            label: "Category Frequency",
            data: [6, 8]
          }
        ]
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(typeof getCurrentUser() === "undefined");
    axios
      .post("/api/models/5c915fd60952fe1628d2a3a2", {
        comment: this.state.commentToPredict
      })
      .then(resp => {
        const result = resp.data;
        var data = { ...this.state.chartDataPoints };
        this.setState({ predictionResult: resp.data });
        if (!(result in this.state.chartDataPoints)) {
          data[result] = 1;
          this.setState({ chartDataPoints: data });
        } else {
          data[result] = data[result] + 1;
          this.setState({ chartDataPoints: data });
        }
        const keys_array = Object.keys(this.state.chartDataPoints);
        console.log(keys_array);
        const values_array = Object.keys(this.state.chartDataPoints).map(
          val => this.state.chartDataPoints[val]
        );
        console.log(values_array);
        const dataGramCopy = update(this.state.chartDatagram, {
          labels: { $set: Object.keys(this.state.chartDataPoints) },
          datasets: {
            $set: [{ label: "Category Frequency", data: values_array }]
          }
        });

        // var tempDataGram = { ...this.state.chartDatagram };
        // tempDataGram.labels = Object.keys(this.state.chartDataPoints);
        // tempDataGram.datasets = {
        //   label: "Category Frequency",
        //   data: Object.values(this.state.chartDataPoints)
        // };
        console.log(dataGramCopy);
        this.setState({ chartDatagram: dataGramCopy });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
        <linechart
          title={"Test TTilsdifsd"}
          data={[5, 6, 7, 3]}
          labels={[1, 2, 3, 4]}
          width={200}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Enter data to predict</label>
            <input
              type="text"
              name="commentToPredict"
              value={this.state.commentToPredict}
              onChange={this.onChange}
              placeholder="I love microsoft, I have no complaints"
            />
          </div>
          <button className="ui button" type="submit">
            Predict
          </button>
        </form>
        <div className="ui visible message">
          <p>{this.state.predictionResult}</p>
        </div>
        <br />
        <br />
        <div className="Chart">
          <Bar
            data={this.state.chartDatagram}
            options={{
              maintainAspectRatio: true,
              title: { display: true, text: "Category Frequency Counts" },
              scales: {
                yAxes: [{ ticks: { beginAtZero: true, min: 0 } }]
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default Visualize;
