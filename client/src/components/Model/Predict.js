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

  onSubmit(event) {}

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
