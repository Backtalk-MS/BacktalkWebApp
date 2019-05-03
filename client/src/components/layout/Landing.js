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
<<<<<<< HEAD
      <div>
        <div className="ui main text container">
          {/* <h1 className="ui header">Spooky</h1> */}
          <br />
          <br />
          <br />
          <p>
            <center>
              <strong>
                <font size="+3">Welcome To BackTalk!</font>
              </strong>
            </center>
          </p>
          <p>
            Developed by Washington State University (WSU) software engineering
            students, this is a Feedback Collection and Analysis System.
          </p>
          <p>
            Using Artificial Intelligence modeling text is grouped, classified,
            and displayed based on sentiment and context in a scalable and
            dynamic environment. This allows companies to interpolate consumer
            feedback on a large scale and search for trends, identify specific
            bugs or abnormalities in real time, create alerts for keywords such
            as "broken" or "newest update" and display results on varied graghs
            and/or charts for simple and easy analysis.
          </p>
          <p>
            To get started, create a profile by{" "}
            <strong>
              <i>
                <a href="http://localhost:3000/Register"> registering </a>
              </i>
            </strong>{" "}
            and browse available models. BackTalk is currently hosted locally
            only with plans to obtain a MIT (open source) license in the near
            future.
          </p>
        </div>
      </div>
=======
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
                <Image avatar src="/images/avatar/large/nan.jpg" />
                <b>Nan</b> Chief Fun Officer Acme Toys
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
            Instead of focusing on content creation and hard work, we have learned
            how to master the art of doing nothing by providing massive amounts of
            whitespace and generic content that can seem massive, monolithic and
            worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>
        </Container>
      </Segment>
    </Container>
>>>>>>> martin
    );
  }
}

export default Landing;
