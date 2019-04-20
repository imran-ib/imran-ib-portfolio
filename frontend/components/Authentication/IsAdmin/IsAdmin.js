import React, { Component } from "react";
import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./../CurrentUser/CurrentUser";
import LonginForm from "./../Login/LoginForm";
import { Card, Container } from "reactstrap";
import Link from "next/link";

class IsAdmin extends Component {
  render() {
    return (
      <Query query={CURRENT_USER_QUERY}>
        {({ data: { me } }) => {
          let isAdmin = null;
          if (me) {
            const { permissions } = me;
            isAdmin = permissions.some(permission =>
              ["ADMIN"].includes(permission)
            );
          }
          if (!isAdmin) {
            return (
              <div style={this.props.padding}>
                <Container>
                  <Card>
                    <div className={`p `}>
                      <h1>
                        Restricted Area.. Only <b>Admin</b> Can Add New Blog 😟
                      </h1>
                      <p>Would You Like To Sign in With An Other Account</p>
                      <p>
                        Or{" "}
                        <Link href="/blogs">
                          <a>View Blogs</a>
                        </Link>
                      </p>
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

export default IsAdmin;
