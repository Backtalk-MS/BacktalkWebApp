import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registeruser } from "../../actions/authActions";
// import classNames from "classnames";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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
    this.props.registeruser(newUser, this.props.history);
  }

  render() {
    // const { user } = this.props.auth;
    return (
      <div className="ui container">
      
      <div class="ui middle aligned center aligned grid">
          <div class="column">
              <h2 class="ui image header">
              <br/><br/><br/><br/>
                <div class="content">
                  Register an account
                </div>
              </h2>
              <form classname="ui large form" onSubmit={this.onSubmit}>
                <div class="ui stacked secondary segment">
                                
                <div class="field">
                    <div class="ui left icon input">
                      <i class="user icon"></i>
                      <input type="text" name="handle" value={this.state.handle} onChange={this.onChange} placeholder="Nickname" />
                    </div>
                  </div>

                  <br/>

                  <div class="field">
                    <div class="ui left icon input">
                      <i class="envelope open outline icon"></i>
                      <input type="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="E-mail address" />
                    </div>
                  </div>

                  <br/>

                  <div class="field">
                    <div class="ui left icon input">
                      <i class="lock icon"></i>
                      <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onChange}/>
                    </div>
                  </div>

                  <br/>

                <div class="ui fluid large teal submit button" type="submit">Submit</div>
              </div>
              <br/>
            </form>
          </div>
      </div>
      </div>
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registeruser }
)(withRouter(Register));
