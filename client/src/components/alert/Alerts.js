import React, { Component } from "react";
import PropTypes from "prop-types";


class Alerts extends Component{
    constructor() {
        super();
        this.state = {
            user: "",
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        const errors = this.state.errors;
        return (
            <div>
                <div className="ui container">
                    <p>
                        This is the ALLEEEERRRTTTSSS page. HELLOOOOOO!?
                    </p>
                </div>
            </div>
        );
    }
}

export default Alerts;