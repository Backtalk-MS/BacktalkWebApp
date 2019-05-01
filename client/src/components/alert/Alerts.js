import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import mongoose from "mongoose";


class Alerts extends Component{
    constructor() {
        super();
        this.state = {
            user: "MyName",
            endpoint: "",
            selectedModel: "",
            threshold: 0,
            label: "",
            errors: {}
        };
        //this.onSubmit = this.onSubmit.bind(this);//Used for submitting an alert
        //this.handleChange = this.handleChange.bind(this);//Used with selecting alert attributes
    }

    onSubmit = (event) => {
        event.preventDefault();
        //Submits with state's values
        //first validate that a collection exists for the requirements
            //if not, create it
        //create json object to store
            //Need to convert the state's threshold to a number
            //check if the threshold is negative, if it is error
        //store

        if(this.state.selectedModel === "") {
            //Popup to warn that selected model is not selected
            return;
        }
        if(this.state.endpoint === "") {
            return;
        }
        if(this.state.label === "") {
            return;
        }
        if(this.state.threshold < 1) {
            return;
        }
        
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const errors = this.state.errors;
        return (
            <div>
                <div className="ui container">
                    <br/>
                    <p>
                        Make sure to pretty up the text!
                    </p>
                    <br/>
                </div>
                <div className="ui container">
                    <div className="ui simple compacted menu" align="center">

                        <select value={this.state.selectedModel} name="selectedModel" onChange={this.handleChange}>
                            <option value="">- Select a model -</option>
                            <option value="model y">Model y</option>
                        </select>

                        <select value={this.state.endpoint} name="endpoint" onChange={this.handleChange}>
                            <option value="">- Select an endpoint -</option>
                            <option value="Endpoint2">Endpoint 2</option>
                        </select>

                        <select value={this.state.endpoint} name="label" onChange={this.handleChange}>
                            <option value="">- Select a label -</option>
                            <option value="Label 1">Label 1</option>
                        </select>

                        <form className="ui form" onChange={this.handleChange}>
                            <div className="field">
                                <label>Enter threshold amount to trigger</label>
                                <input
                                    type="number"
                                    name="threshold"
                                    value={this.state.threshold}
                                    onChange={this.onChange}
                                    placeholder="10"//Starts at 0 from the state
                                />
                            </div>
                        </form>

                        <button className="ui button" type="submit" onSubmit={this.onSubmit /* This seems to not be working */}>
                            Create Alert
                        </button>
                    </div>
                </div>



                <div /* This section is for testing purposes */ className="ui main text container">
                    <h1 >User: {this.state.user}</h1>
                    <h1>Model: {this.state.selectedModel}</h1>
                    <h1>Endpoint: {this.state.endpoint}</h1>
                    <h1>Label: {this.state.label}</h1>
                    <h1>Threshold: {this.state.threshold}</h1>
                </div>
            </div>
        );
    }
}

export default Alerts;