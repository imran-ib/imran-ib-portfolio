import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      name
      email
      permissions
    }
  }
`;

class CurrentUser extends Component {
  render() {
    return (
      <Query {...this.props} query={CURRENT_USER_QUERY}>
        {payload => this.props.children(payload)}
      </Query>
    );
  }
}

export default CurrentUser;
// export current user query so we can use it in other components
export { CURRENT_USER_QUERY };
