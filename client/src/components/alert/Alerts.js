import React, { Component } from "react";
import { getCurrentUser } from "../../actions/authActions";
import axios from "axios";

class Alerts extends Component {
  constructor() {
    super();
    this.loggedInUser = getCurrentUser();
    this.state = {
      user: this.loggedInUser.handle,
      endpoint: "",
      selectedModel: "",
      threshold: 0,
      label: "",
      timespan: 0, //0 what
      timeUnits: "hrs",
      errors: {}
    };
  }

  //Alerts the children of a given select DOM element
  //@Parameters: options: list of strings, stateAttribute: what stateAttribute you'll be setting
  //@Return: select: document element of type 'select' that is filled with the options contents
  setSelectOptions(selectList, options, stateAttribute) {
    if (!Array.isArray(options)) {
      console.log(
        "Function 'getSelectOptions' received wrong type arguments. 'options' was not of type Array"
      );
      return;
    } else if (typeof selectList === null) {
      console.log("selectList is null in Alerts.setSelectOptions()");
      return;
    }

    console.log(options);
    try {
      if (selectList.length < options.length + 1) {
        //This if throws exception when lenght ===0
        //2 for the initial default models
        //Only does it once
        console.log("Adding options");
        for (var i = 0; i < options.length; i++) {
          var endpoint = options[i];
          var newOption = document.createElement("option");
          newOption.value = endpoint;
          newOption.text = options[i] /*String(Array(options)[i])*/;
          selectList.appendChild(newOption);
        }
      } else {
        console.log("Didn't need to add the options. They already exist.");
      }
    } catch (error) {
      console.log(
        `ERROR: options is NULL in Alerts.setSelectOptions(): ${error}`
      );
    }
  }

  submitAlert = event => {
    event.preventDefault();
    if (this.state.selectedModel === "") {
      //Popup to warn that selected model is not selected
      console.log("Invalid model");
      return;
    }
    if (this.state.endpoint === "") {
      console.log("Invalid endpoint");
      return;
    }
    if (this.state.label === "") {
      console.log("Invalid label");
      return;
    }
    if (this.state.threshold < 1) {
      console.log("Invalid threshold");
      return;
    }
    if (this.state.timeUnits === "") {
      console.log("Invalid timeUnits");
      return;
    }

    console.log("Submitting alert...");
    axios
      .post("/api/alerts", {
        endpoint: this.state.endpoint,
        model: this.state.selectedModel,
        threshold: this.state.threshold,
        label: this.state.label,
        timespan: this.getAlertDate(this.state.timespan, this.state.timeUnits) //TODO: Need to add a way to add a time on the page
      })
      .then(resp => {
        const result = resp.data;
        console.log(result);
      })
      .catch(err => {
        console.log("This being called before button press is scarry");
      });
  };

  updateLabels = event => {
    if (this.state.selectedModel === "Default Sentiment") {
      //Labels turn into number ranges
    } else if (this.state.selectedModel === "Default Category") {
      //Grab labels from model
      console.log("Going to get labels: " + this.state.selectedModel);
      axios
        .post("/api/models/labels", {
          name: this.state.selectedModel
        })
        .then(resp => {
          const result = resp.data;
          console.log("Received data: " + result);
          this.setSelectOptions(event.target, result, "modelName");
        });
    } else {
      console.log("First choose model.");
    }
  };

  updateSelect = event => {
    var sel1, sel2;
    if (event.target.name === "endpoint") {
      sel1 = event.target;
      this.setSelectOptions(sel1, this.loggedInUser.endpoints, "endpoint");
    } else if (event.target.name === "selectedModel") {
      sel2 = event.target;
      var options = this.loggedInUser.endpoints;
      sel2 = event.target;
      //We need to go get the endpoint's models
      axios
        .post("/api/endpoints/getModels", {
          _id: this.state.endpoint
        })
        .then(resp => {
          options = resp.data;
          console.log("Models received.");
        });
      Array(options).concat(["Default Sentiment", "Default Category"]);
      this.setSelectOptions(sel2, options, "model");
    } else {
      console.log("Not used on something worth while...");
    }
  };

  handleChange = event => {
    /*console.log(
      "Name: " + event.target.name + ", Value: " + event.target.value
    );*/
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className="ui container">
          <br />
          <p>Make sure to pretty up the text!</p>
          <br />
        </div>
        <div className="ui container">
          <div className="ui simple compacted menu" align="center">
            <select
              value={this.state.endpoint}
              name="endpoint"
              id="sel1"
              onClick={this.updateSelect}
              onChange={this.handleChange}
            >
              <option value="">- Select an Endpoint -</option>
            </select>

            <select
              value={this.state.selectedModel}
              name="selectedModel"
              onClick={this.updateSelect}
              onChange={this.handleChange}
              id="sel2"
            >
              <option value="">- Select a model -</option>
              <option value="Default Sentiment">Default Sentiment Model</option>
              <option value="Default Category">Default Category Model</option>
            </select>

            <select
              value={this.state.label}
              name="label"
              onChange={this.handleChange}
              onClick={this.updateLabels}
            >
              <option value="">- Select a label -</option>
            </select>

            <form className="ui form">
              <div className="field">
                <label>
                  Enter timespan between all entries to model to check against
                  alert
                </label>
                <input
                  min="1"
                  type="number"
                  name="timespan"
                  value={this.state.timespan}
                  onChange={this.handleChange}
                  placeholder="10"
                />
              </div>
              <div className="form-check">
                <label>
                  <input
                    onChange={this.handleChange}
                    type="radio"
                    name="timeUnits"
                    value="hours"
                    className="form-check-input"
                  />
                  Hours
                </label>
                <br />
                <label>
                  <input
                    onChange={this.handleChange}
                    type="radio"
                    name="timeUnits"
                    value="days"
                    className="form-check-input"
                  />
                  Days
                </label>
                <br />
                <label>
                  <input
                    onChange={this.handleChange}
                    type="radio"
                    name="timeUnits"
                    value="weeks"
                    className="form-check-input"
                  />
                  Weeks
                </label>
              </div>
            </form>

            <form className="ui form" onSubmit={this.submitAlert}>
              <div className="field">
                <label>Enter threshold amount to trigger</label>
                <input
                  type="number"
                  min="1"
                  name="threshold"
                  value={this.state.threshold}
                  onChange={this.handleChange}
                  placeholder="10" //Starts at 0 from the state
                />
              </div>
              <button className="ui button">Create Alert</button>
            </form>
          </div>
        </div>

        <div
          /* This section is for testing purposes */ className="ui main text container"
        >
          <h1>User: {this.state.user}</h1>
          <h1>Model: {this.state.selectedModel}</h1>
          <h1>Endpoint: {this.state.endpoint}</h1>
          <h1>Label: {this.state.label}</h1>
          <h1>
            Timespan: {this.state.timespan} {this.state.timeUnits}
          </h1>
          <h1>Threshold: {this.state.threshold}</h1>
        </div>
      </div>
    );
  }

  getAlertDate(duration, units) {
    var end = Date.now();
    if (units === "days") {
      //add days
      end.setDate(end.getDate() + duration);
    } else if (units === "hours") {
      //add hours
      end.setDate(end.getDate() + duration / 24);
    } else if (units === "weeks") {
      //add weeks
      end.setDate(end.getDate() + duration * 7);
    } else {
      console.log("ERROR: Wrong unit type of time in Alerts.getAlertDate()");
    }
    return end;
  }
}

export default Alerts;
