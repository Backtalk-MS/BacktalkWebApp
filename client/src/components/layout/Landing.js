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
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

class Landing extends Component {
  render() {
    return (
      <Container>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
              BackTalk
              </Header>
              <p style={{ fontSize: "1.33em" }}>
              
              BackTalk aims to provide clients with a way to 
              quickly manage and visualize incoming user data
               such as user reviews and complaints through a user-friendly GUI. ​
              </p>
              <Link to= "/Demo"><Button size="huge" textAlign="center">Check Them Out</Button></Link>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
            <img src={require('../images/biglogo.png')} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "I shouldn't have gone with their competitor."
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <b>Aleks</b> Data Analyst
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
  
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            BackTalk groups, classifies, and displays text 
            based on sentiment and context in a scalable and dynamic environment. This allows 
            companies to interpolate consumer feedback on a large scale and search for trends,
            identify specific bugs or abnormalities in real time, create alerts for keywords 
            such as "broken" or "newest update" and display results on varied graphs and/or 
            charts for simple and easy analysis.  
          </p>
        </Container>
      </Segment>
      </Container>
    );
  }
}

export default Landing;
