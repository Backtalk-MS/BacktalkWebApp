import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
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
    );
  }
}

export default Landing;
