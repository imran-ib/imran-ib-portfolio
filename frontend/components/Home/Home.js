import React, { Component } from "react";
import { HomeStyles } from "./HomeStyles";
import { Container, Row, Col } from "reactstrap";
import ReactTyped from "react-typed";
import CurrentUser from "./../Authentication/CurrentUser/CurrentUser";

const Roles = [
  "Developer !",
  "Tech Lover !",
  "Team Player !",
  "Course Creater !",
  "React Lover !",
  "Javascript Lover !"
];

class Home extends Component {
  render() {
    return (
      <HomeStyles>
        <CurrentUser>
          {({ data: { me } }) => (
            <div className="bck__cover">
              <div className="main-section">
                <div className="background-image">
                  <img src="/static/4.2 background-index.png" />
                </div>

                <Container>
                  <Row>
                    <Col md="6">
                      <div className="hero-section">
                        <div className={`flipper`}>
                          <div className="back">
                            <div className="hero-section-content">
                              <h2> Full Stack Web Developer </h2>
                              <div className="hero-section-content-intro">
                                Have a look at my portfolio and job history.
                              </div>
                            </div>
                            <img
                              className="image"
                              src="/static/4.1 section-1.png.png"
                            />
                            <div className="shadow-custom">
                              <div className="shadow-inner"> </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col md="6" className="hero-welcome-wrapper">
                      <div className="hero-welcome-text">
                        <h1>
                          <b>{me && me.name}</b> Welcome to the portfolio
                          website of Imran Irshad. Get informed, collaborate and
                          discover projects I was working on through the years !
                        </h1>
                      </div>
                      <ReactTyped
                        loop
                        typeSpeed={60}
                        backSpeed={60}
                        strings={Roles}
                        smartBackspace
                        backDelay={1000}
                        loopCount={0}
                        showCursor
                        cursorChar="|"
                        className="self-typed-text"
                      />
                      <div className="hero-welcome-bio">
                        <h1>Let's take a look on my work.</h1>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          )}
        </CurrentUser>
      </HomeStyles>
    );
  }
}

export default Home;
