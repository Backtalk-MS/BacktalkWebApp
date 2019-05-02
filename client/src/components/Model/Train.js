import React, { Component } from "react";
import axios from "axios";

class Train extends Component {
  constructor() {
    super();
    this.state = {
      user: "MyUserName", //Retreive from bearer token
      endpoint: "ExistingEndpoint", //selected from a list after retreiving it from user's existing endpoints
      modelName: "NewModelName", //new model name to add to the endpoint
      labels: ["label1", "label2", "label3"],
      dataset: {},
      errors: {},
      description: "",
      selectedFile: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    formData.append("description", description);
    formData.append("selectedFile", selectedFile);
    axios
      .post("/api/models/train", formData)
      .then(console.log("Successfully uploaded a file"))
      .catch(error => {
        console.log(`Unsuccessfully uploaded a file with error ${error}`);
      });
  };

  onChange = event => {
    if (event.target.name === "selectedFile") {
      console.log("Definitely....");
      console.log();
      this.setState({ selectedFile: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

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
        <div className="ui main text container">
          <p>
            <b>
              In the model architecture that's being loaded from the JSON, the
              number of nodes in the final layer needs to be equal to the number
              of unique labels that the model is being trained on.
            </b>
          </p>
        </div>

        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
          />
          <input type="file" name="selectedFile" onChange={this.onChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default Train;
