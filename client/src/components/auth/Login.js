import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
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
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  }

  render() {
    return (
      <div className="ui container">
        <br />
        <br />
        <br />
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label>email</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              placeholder="xyz@numerals.com"
            />
          </div>
          <div className="field">
            <label>password</label>
            <input
              type="password"
              name="password"
              placeholder="******** (testpass)"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button className="ui button" type="submit">
            Log In
          </button>
        </form>
        {/* <form className="ui form" onSubmit={this.onSubmit}>
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
        </form> */}
        <br />
        <br />
      </div>
    );
  }
}

export default Login;
