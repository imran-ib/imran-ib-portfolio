import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./../CurrentUser/CurrentUser";
import LonginForm from "./../Login/LoginForm";
import { Card, Container } from "reactstrap";

class PleaseSignin extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { me } }) => {
          if (!me) {
            return (
              <div style={this.props.padding}>
                <Container>
                  <Card>
                    <div className={`p `}>
                      <h1>You are not Logedin 😟</h1>
                      <LonginForm />
                    </div>
                  </Card>
                </Container>
              </div>
            );
          }
          return this.props.children;
        }}
      </Query>
    );
  }
}

export default PleaseSignin;
