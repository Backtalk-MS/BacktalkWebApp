import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const newUser = {
      handle: this.state.handle,
      email: this.state.email,
      password: this.state.password
    };
    console.log(newUser);
  }

  render() {
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>Nickname</label>
            <input
              type="text"
              name="handle"
              value={this.state.handle}
              onChange={this.onChange}
              placeholder="StackOverflowMaster"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="abc@alphabet.com"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              placeholder="password123"
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default Register;
