import React, { Component } from "react";
import { getCurrentUser } from "../../actions/authActions";

class Alerts extends Component {
  constructor() {
    super();
    this.loggedInUser = Object(getCurrentUser());
    //this.endpoints = loggedInUser.endpoints;
    this.state = {
      user: this.loggedInUser.handle,
      endpoint: "",
      selectedModel: "",
      threshold: 0,
      label: "",
      errors: {}
    };
    //this.submitAlert = this.submitAlert.bind(this); //Used for submitting an alert
    //this.handleChange = this.handleChange.bind(this);//Used with selecting alert attributes
  }

  //Returns a selectList comprised of the contents of the parameters
  //@Parameters: options: list of strings, stateAttribute: what stateAttribute you'll be setting
  //@Return: select: document element of type 'select' that is filled with the options contents
  getSelectOptions(selectList, options, stateAttribute) {
    if (typeof option != Array) {
      console.log(
        "Function 'getSelectOptions' received wrong type arguments. 'options' was not of type Array"
      );
      return;
    }
    //Create list
    /*
    var selectList = document.createElement("select");
    selectList.value = stateAttribute;
    selectList.onchange = this.handleChange;
    */
    //Add the first option for presentation purposes
    var option = document.createElement("option");
    option.value = "";
    option.text = "- SELECT " + String(stateAttribute).toLocaleUpperCase + " -";
    selectList.appendChild(option);
    //Add all elements in options
    for (var i = 0; i < Array(options).length; i++) {
      var newOption = document.createElement("option");
      newOption.value = Array(options)[i];
      newOption.text = String(Array(options)[i]);
      selectList.appendChild(newOption);
    }
  }

  submitAlert = event => {
    event.preventDefault();
    //Submits with state's values
    //first validate that a collection exists for the requirements
    //if not, create it
    //create json object to store
    //Need to convert the state's threshold to a number
    //check if the threshold is negative, if it is error
    //store
    //console.log("testing");
    if (this.state.selectedModel === "") {
      //Popup to warn that selected model is not selected
      console.log("testing");
      return;
    }
    if (this.state.endpoint === "") {
      console.log("testing");
      return;
    }
    if (this.state.label === "") {
      console.log("testing");
      return;
    }
    if (this.state.threshold < 1) {
      console.log("testing");
      return;
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
              value={this.state.selectedModel}
              name="selectedModel"
              onChange={this.handleChange}
            >
              <option value="">- Select a model -</option>
              <option value="model y">Model y</option>
            </select>

            <select
              value={this.state.endpoint}
              name="endpoint"
              onChange={this.handleChange}
            >
              <option value="">- Select an endpoint -</option>
              <option value="Endpoint2">Endpoint 2</option>
            </select>

            <select
              value={this.state.label}
              name="label"
              onChange={this.handleChange}
            >
              <option value="">- Select a label -</option>
              <option value="Label 1">Label 1</option>
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
