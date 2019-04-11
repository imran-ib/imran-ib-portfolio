import React from "react";
import { Button, Alert } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_ALL_PORTFOLIOS } from "../../Portfolio/PortfolioCard";

const DELETE_PORTFOLIO_MUTATION = gql`
  mutation DELETE_PORTFOLIO_MUTATION($id: ID!) {
    deletePortfolio(id: $id) {
      id
    }
  }
`;

function DeleteButton(props) {
  return (
    <Mutation
      mutation={DELETE_PORTFOLIO_MUTATION}
      variables={{ id: props.id }}
      refetchQueries={[{ query: GET_ALL_PORTFOLIOS }]}
    >
      {(deletePortfolio, { loading, error }) => {
        if (error) return <Alert color="danger">{error.message}</Alert>;
        return (
          <Button
            disabled={loading}
            onClick={e => {
              e.stopPropagation();
              if (confirm("Are You Sure You Want To Delete This Portfolio")) {
                return deletePortfolio();
              }
            }}
            color="danger"
          >
            Delete
          </Button>
        );
      }}
    </Mutation>
  );
}

export default DeleteButton;
