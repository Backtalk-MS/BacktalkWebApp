import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

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
            <Container>
            <Segment vertical center>
                  <img src={require('../images/teampicture.png')} />
                  <center>
                    <Header as="h3" style={{ fontSize: "3em" }}>
                    <p>Meet the BackTalk Team!</p></Header>
                    <Header as="h2" style={{ fontSize: "2em" }}>Aleks Zemlyanskiy, Martin Nguyen, Aleksandr Mandzyuk, Robert Simons, Austin Minich</Header>
                    </center>
            </Segment>
        
            <Segment style={{ padding: "8em 0em" }} vertical>
            <Item.Group divided>
    <Item>
      <Item.Image src={require('../images/avatar/aleks.png')} />

      <Item.Content>
        <Item.Header as='a'>Aleks Zemlyanskiy</Item.Header>
        <Item.Meta>
          <span className='cinema'>Software Engineering Senior</span>
        </Item.Meta>
        <Item.Description>Software Engineering Intern at Schweitzer Engineering Laboratories (SEL)</Item.Description>
        <Item.Extra>
            <Label icon='globe' content='Programming Lead' />
          <Label>Project Architecture</Label><Label>Machine Learning Automation</Label><Label>Data Collection</Label><Label>Frontend Development</Label><Label>Backend Development</Label><Label>Testing</Label><Label>Ingestion Pipeline Development</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src={require('../images/avatar/martin.png')} />

      <Item.Content>
        <Item.Header as='a'>Martin Nguyen</Item.Header>
        <Item.Meta>
          <span className='cinema'>Software Engineering Senior</span>
        </Item.Meta>
        <Item.Description>Software Engineering Senior, Student Government Vice President, and ACM Treasurer at Washington State University Everett.</Item.Description>
        <Item.Extra>
          <Label>Machine Learning Automation</Label><Label>Data Collection</Label><Label>Frontend Development</Label><Label>Backend Development</Label><Label>Testing</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src={require('../images/avatar/alek.png')} />

      <Item.Content>
        <Item.Header as='a'>Aleksandr Mandzyuk</Item.Header>
        <Item.Meta>
          <span className='cinema'>Software Engineering Senior</span>
        </Item.Meta>
        <Item.Description>Software Engineering student with an expected graduation date of Dec. 2019.
Always looking for a challenge, and work best under pressure. Interested in learning more about all areas of software engineering whether that is full stack web development, artificial intelligence, system architecture, algorithms, etc. </Item.Description>
      <Item.Extra>
          <Label>Machine Learning Development</Label><Label>Prediction Service Development</Label> <Label>API Development</Label><Label>Project Architecture</Label><Label>Backend Development</Label>
      </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src={require('../images/avatar/robert.png')} />

      <Item.Content>
        <Item.Header as='a'>Robert Simons</Item.Header>
        <Item.Meta>
          <span className='cinema'>Software Engineering Senior</span>
        </Item.Meta>
        <Item.Description>Software Engineering student with an expected graduation date of Dec. 2019.
        In Senior year pursuing a B.S. in Software Engineering at Washington State University in Everett.
        </Item.Description>
        <Item.Extra>
            <Label>Team Liaison</Label><Label>Machine Learning Development</Label><Label>Frontend Development</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image src={require('../images/avatar/austin.png')} />

      <Item.Content>
        <Item.Header as='a'>Austin Minich</Item.Header>
        <Item.Meta>
          <span className='cinema'>Software Engineering Senior</span>
        </Item.Meta>
        <Item.Description>Software Engineering student with an expected graduation date of Dec. 2019.
        Studying to become a Software Engineer
        </Item.Description>
        <Item.Extra>
            <Label>Project Architecture</Label><Label>Machine Learning Development</Label><Label>Alert System</Label><Label>Frontend Development</Label><Label>Backend Development</Label><Label>Testing</Label>
        </Item.Extra>
      </Item.Content>
    </Item>

  </Item.Group>
            </Segment>
            </Container>
        );
    }
}

export default About;
