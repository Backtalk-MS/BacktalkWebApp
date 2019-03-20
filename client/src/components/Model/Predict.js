import React, { Component } from "react";
import axios from "axios";

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
    console.log(this.state.commentToPredict);
    event.preventDefault();
    axios
      .post("/api/models/5c915fd60952fe1628d2a3a2", {
        comment: this.state.commentToPredict
      })
      .then(resp => {
        console.log(resp);
        this.setState({ predictionResult: resp.data });
      })
      .catch(err => console.log(err));
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
