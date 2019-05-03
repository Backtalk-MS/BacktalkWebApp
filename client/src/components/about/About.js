import React, { Component } from "react";
import linechart from "../charts/LineChart";
import axios from "axios";
import { Bar, Line, Pie, defaults } from "react-chartjs-2";
import update from "immutability-helper";
import { getCurrentUser } from "../../actions/authActions";

class About extends Component {
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

export default About;
