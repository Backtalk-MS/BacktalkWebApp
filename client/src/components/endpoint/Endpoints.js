import React, { Component } from "react";
import { getCurrentUser } from "../../actions/authActions";
import axios from "axios";

class Endpoint extends Component {
  constructor() {
    super();
    this.loggedInUser = getCurrentUser();
    this.state = {
      endpoint: "",
      errors: {}
    };
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
  }

  submitAlert = event => {
    event.preventDefault();
    //Submits with state's values
    //first validate that a collection exists for the requirements (BACKEND)
    //if not, create it
    //create json object to store
    //check if the threshold is negative, if it is error
    //store
    if (this.state.endpoint === "") {
      console.log("Invalid endpoint");
      return;
    }

    axios
      .post("/api/endpoints", {
        endpoint: this.state.endpoint,
        user: this.loggedInUser
      })
      .then(resp => {
        const result = resp.data;
        console.log(result);
      });
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
          <p>
            This is ideally a popup or something that's not an <i>enitre </i>
            page
          </p>
          <br />
        </div>
        <div className="ui container">
          <div className="ui simple compacted menu" align="center">
            <form
              className="ui form"
              onChange={this.onChange}
              onSubmit={this.submitAlert}
            >
              <div className="field">
                <label>Enter threshold amount to trigger</label>
                <input
                  type="text"
                  name="endpoint"
                  value={this.state.endpoint}
                  onChange={this.handleChange}
                  placeholder="My new software" //Starts at 0 from the state
                />
              </div>
              <button className="ui button">Create new Software Group</button>
            </form>
          </div>
        </div>

        <div
          /* This section is for testing purposes */ className="ui main text container"
        >
          <h1>User: {this.loggedInUser.handle}</h1>
          <h1>Endpoint: {this.state.endpoint}</h1>
        </div>
      </div>
    );
  }
}

export default Endpoint;
