import React, { Component } from "react";
import PropTypes from "prop-types";


class Account extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            errors: {}
        };
    }

    render() {
        const errors = this.state.errors;
        return (
            <div>
                <div className="ui container">
                    <p>
                        This is the account page. HELLOOOOOO!?
                    </p>
                </div>
            </div>
        );
    }
}

export default Account;