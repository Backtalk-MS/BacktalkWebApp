import React, { Component } from "react";
import { Item } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Demo extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            errors: {}
        };
    }

    render() {
        return (
            <div class="center-screen">
            <Item.Group>
            <Item>
            <Link to="/models/predict" className="header item">
            <button class="circular massive ui icon button">
                <i class="cogs icon"></i>
            </button>       
            </Link>       
             <Item.Content>
                <Link to="/models/predict" className="header item">
                <Item.Header as='a'>Predict</Item.Header>
                <Item.Description>
                  <p>Input a string and our server will tell you what category it belongs to</p>
                </Item.Description>
                </Link>
              </Item.Content>
            </Item>

            <Item>
            <Link to="/models/train" className="header item">
            <button class="circular massive ui icon button">
                <i class="download icon"></i>
            </button>      
            </Link>   
            <Item.Content>
                <Link to="/models/train" className="header item">
                <Item.Header as='a'>Train</Item.Header>
                <Item.Description>
                  <p>Input a new string into the database to be apart of the training data</p>
                </Item.Description>
                </Link>
              </Item.Content>
            </Item>

            <Item>
            <Link to="/Alerts" className="header item">
            <button class="circular massive ui icon button">
                <i class="bell icon"></i>
            </button>
            </Link>
              <Item.Content>
                <Link to="/Alerts" className="header item">
                <Item.Header as='a'>Alerts</Item.Header>
                <Item.Description>
                  <p>View categories that have hit their notification threshhold</p>
                </Item.Description>
                </Link>
              </Item.Content>
            </Item>

            <Item>
            <Link to="/SoftwareGroups" className="header item">
            <button class="circular massive ui icon button">
                <i class="pencil alternative icon"></i>
            </button>
            </Link>
              <Item.Content>
                <Link to="/SoftwareGroups" className="header item">
                <Item.Header as='a'>Software Groups</Item.Header>
                <Item.Description>
                  <p>Edit and view endpoints</p>
                </Item.Description>
                </Link>
              </Item.Content>
            </Item>

            <Item>
            <Link to="/Visualize" className="header item">
            <button class="circular massive ui icon button">
                <i class="folder open icon"></i>
            </button>
            </Link>
              <Item.Content>
                <Link to="/Visualize" className="header item">
                <Item.Header as='a'>Visualize</Item.Header>
                <Item.Description>
                  <p>View categories and statistics</p>
                </Item.Description>
                </Link>
              </Item.Content>
            </Item>

          </Item.Group>
          </div>
        );
    }
}

export default Demo;
