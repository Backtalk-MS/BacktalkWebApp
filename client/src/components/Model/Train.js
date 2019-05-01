import React, { Component } from "react";

class Train extends Component {
  constructor() {
    super();
    this.state = {
      user: "MyUserName", //Retreive from bearer token
      endpoint: "ExistingEndpoint", //selected from a list after retreiving it from user's existing endpoints
      modelName: "NewModelName", //new model name to add to the endpoint
      labels: ["label1", "label2", "label3"],
      dataset: {},
      errors: {}
    };
  }

  submitBttn = event => {};

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const errors = errors;
    return (
      <div className="ui container">
        <div className="ui list">
          <h1>
            <b>Things to perform on this page</b>
          </h1>
          <br />
          <b>Retreive user information to do everything with</b>
          <br />
          <b>Add dynamically updating lists to choose endpoint</b>
          <br />
          <b>Upload dataset</b>
          <br />
          <b>Add labels that the model will contain and train to</b>
          <br />
          <b>Enter a name for the new model</b>
          <br />
          <b>
            Create a popup with the errors if the submit button is hit but one
            of the fields is empty
          </b>
          <br />
        </div>
      </div>
    );
  }
}

export default Train;
