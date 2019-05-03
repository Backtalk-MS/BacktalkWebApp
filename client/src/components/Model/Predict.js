import React, { Component } from "react";
import linechart from "../charts/LineChart";
import axios from "axios";
import { Bar, Pie /*Line, defaults*/ } from "react-chartjs-2";
import update from "immutability-helper";
import { getCurrentUser } from "../../actions/authActions";
import { setSelectOptions } from "../../utilities/componentTools";

class Predict extends Component {
  constructor() {
    super();
    this.loggedInUser = getCurrentUser();
    this.state = {
      radioBoxSelected: "",
      commentToPredict: "test",
      errors: {},
      predictionResult: "Microsoft office",
      modelType: "feedback",
      endpoint: "",
      chartDataPoints: {},
      countDown: 0,
      chartDatagram: {
        labels: ["category", "sentiment", "Custom Model1"],
        datasets: [
          {
            label: "Alert Frequency",
            data: [1, 3, 6]
          }
        ]
      }
    };
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  handleSelect = event => {
    //this.state.endpoint = event.target.name;
    setSelectOptions(
      event.target,
      this.loggedInUser.endpoints,
      "endpointsName"
    );
  };

  onChange = event => {
    /*console.log(
      "name: " + event.target.name + ", value: " + event.target.value
    );*/
    if (event.target.name === "modelType") {
      this.state.radioBoxSelected = event.target.value;
      console.log(`radio value selected: ${event.target.value}`);
    }
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "endpoint") {
      this.state.endpoint = event.target.value;
    }
  };

  onSubmit = event => {
    event.preventDefault();
    if (
      this.state.radioBoxSelected === "feedback" ||
      this.state.radioBoxSelected === "review"
    ) {
      console.log("We expected this");
      var sentiment = 100000;
      axios
        .post("/api/models/predict/sentiment", {
          rawText: this.state.commentToPredict
        })
        .then(resp => {
          console.log("Received: " + resp.data);
          this.setState({ predictionResult: `Sentiment: ${resp.data.msg}` });
          // this.state.predictionResult = resp.data.msg;
          sentiment = resp.data.msg;
        })
        .catch(error => {
          console.log(`ERROR: in button: ${error}`);
        });

      console.log(this.state.endpoint);
      axios
        .post("/api/alerts/get", { endpoint: this.state.endpoint })
        .then(foundAlert => {
          if (sentiment <= 0.6 && sentiment >= 0.4) {
            //only increment in range
            this.state.countDown = this.state.countDown + 1;
          }
          console.log(this.state.countDown);
          console.log(foundAlert.data);
          if (foundAlert.data <= this.state.countDown) {
            alert("Threshold reached!");
            this.state.countDown = 0;
          }
        });
    } else {
      console.log(typeof getCurrentUser() === "undefined");
      console.log(this.state.endpoint);
      axios
        .post("/api/models/predict", {
          comment: this.state.commentToPredict,
          modelType: this.state.modelType,
          endpointId: this.state.endpoint
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
  };

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

          <div className="form-check">
            <label>
              <input
                onChange={this.onChange}
                type="radio"
                name="modelType"
                value="bug"
                className="form-check-input"
              />
              Bug Report
            </label>
            <label>
              <input
                onChange={this.onChange}
                type="radio"
                name="modelType"
                value="feedback"
                className="form-check-input"
              />
              General Comment
            </label>
            <label>
              <input
                onChange={this.onChange}
                type="radio"
                name="modelType"
                value="review"
                className="form-check-input"
              />
              Review
            </label>
            <form>
              <div className="ui simple compacted menu" align="center">
                <select
                  value={this.state.endpoint}
                  name="endpoint"
                  id="sel1"
                  onChange={this.onChange}
                  onClick={this.handleSelect}
                >
                  <option value="">- Select an Endpoint -</option>
                </select>
              </div>
            </form>
          </div>
          <button className="ui button" type="submit" name="NOT ENDPOINT">
            Predict
          </button>
        </form>
        <div className="ui visible message">
          <p>{this.state.predictionResult}</p>
        </div>
        <br />
        <br />
        <div className="Chart">
          <Pie
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
        <h1>Endpoint: {this.state.endpoint}</h1>
      </div>
    );
  }
}

export default Predict;
