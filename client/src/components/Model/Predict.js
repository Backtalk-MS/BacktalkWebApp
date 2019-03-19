import React, { Component } from "react";
// import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      commentToPredict: "",
      errors: {},
      predictionResult: "Microsoft office"
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    // event.preventDefault();
    // axios
    //     .post(
    //     'https://uswestcentral.services.azureml.net/workspaces/ceeb98b1536e4dc1be16c1390d61d5da/services/3ee0348e5d7045818991a74371f224e0/execute?api-version=2.0&details=true',
    //     {
    //         Inputs: {
    //         input1: {
    //             ColumnNames: ["Category", "Subcategory", "Title", "Content"],
    //             Values: [[" ", " ", " ", this.state.commentToPredict]]
    //         }
    //         },
    //         GlobalParameters: {},
    //     },
    //     {
    //         headers: {
    //         'Authorization': 'Bearer gTBKO2h4dp29PeY5ZwAScz8Kfmz1Ayk9sQiU74mBKu4lFwfQlSspX09MFlqA2tH0c6Gl8E06z7KiKd3WFWNB1Q==',
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //         'Access-Control-Allow-Credentials': 'true'
    //         }
    //     }
    //     )
    //     .then(response => {
    //         const result = response.data.Results.output1.value.Values[0][0];
    //         this.state.setState({predictionResult: result});
    //     })
    //     .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
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
      </div>
    );
  }
}

export default Login;
