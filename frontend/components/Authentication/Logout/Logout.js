import React from "react";
import { toast } from "react-toastify";
import { NavItem } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../CurrentUser/CurrentUser";
import Router from "next/router";

const LOGOUT_MUTATION = gql`
  mutation LOGOUT_MUTATION {
    SignOut {
      message
    }
  }
`;

export default function Logout(props) {
  return (
    <Mutation
      mutation={LOGOUT_MUTATION}
      refetchQueries={[
        {
          query: CURRENT_USER_QUERY
        }
      ]}
    >
      {(SignOut, { loading, error }) => (
        <NavItem>
          <a
            onClick={() => {
              SignOut();
              if (!error && !loading) {
                toast.success(`Goodbye! 👋 `, {
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 3000
                });
                Router.push("/");
              }
            }}
            className="port-navbar-link clickable nav-link"
          >
            Logout
          </a>
        </NavItem>
      )}
    </Mutation>
  );
}
