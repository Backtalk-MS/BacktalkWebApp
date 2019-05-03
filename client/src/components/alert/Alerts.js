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
      console.log("selectList is null.");
      return;
    }

    if (selectList.length < Array(options).length + 1) {
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

    console.log("Submitting alert...");
    axios
      .post("/api/alerts", {
        endpoint: this.state.endpoint,
        model: this.state.selectedModel,
        threshold: this.state.threshold,
        label: this.state.label,
        timespan: Date.now() //TODO: Need to add a way to add a time on the page
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
      console.log("just set the ranges manually...");
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
      console.log("sending request");
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

            <form
              className="ui form"
              onChange={this.onChange}
              onSubmit={this.submitAlert}
            >
              <div className="field">
                <label>Enter threshold amount to trigger</label>
                <input
                  type="number"
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
          <h1>Threshold: {this.state.threshold}</h1>
        </div>
      </div>
    );
  }
}

export default Alerts;
