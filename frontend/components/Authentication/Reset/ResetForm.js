import React, { Component } from "react";
import Router from "next/router";
import { AuthStyles } from "../AuthStyles";
import { toast } from "react-toastify";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
  Alert
} from "reactstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../CurrentUser/CurrentUser";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class ResetForm extends Component {
  state = {
    email: ""
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { email } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading, called }) => {
          return (
            <AuthStyles>
              <Form
                method="POST"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await requestReset();
                  this.setState({
                    email: ""
                  });
                  if (!error) {
                    toast.success(`A reset Token Has been sent to ${email}`, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                    Router.push("/auth");
                  }
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="custom-col">
                    {loading ? (
                      <>
                        <div className="text-center ">
                          <h2>Generating token...</h2>
                        </div>
                      </>
                    ) : (
                      <h2>Reset Password</h2>
                    )}
                    {loading && (
                      <Progress bar animated color="success" value="100">
                        Please Wait
                      </Progress>
                    )}
                    {error && <Alert color="danger">{error.message}</Alert>}
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInput}
                      />
                    </FormGroup>{" "}
                    <Button color="primary">
                      Submit{loading ? "ing..." : ""}
                    </Button>
                  </div>
                </fieldset>
              </Form>
            </AuthStyles>
          );
        }}
      </Mutation>
    );
  }
}

export default ResetForm;
