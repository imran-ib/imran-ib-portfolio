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
  Alert,
  Container,
  Card
} from "reactstrap";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { CURRENT_USER_QUERY } from "../CurrentUser/CurrentUser";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      name
      email
    }
  }
`;

class PasswordReserForm extends Component {
  state = {
    showPassword: false,
    password: "",
    confirmPassword: ""
  };
  passwordVisible = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { password, confirmPassword } = this.state;
    const { resetToken } = this.props;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{
          resetToken,
          password,
          confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { error, loading, called }) => {
          return (
            <AuthStyles>
              <Card>
                <Container>
                  <Form
                    method="POST"
                    onSubmit={async e => {
                      e.preventDefault();
                      const res = await resetPassword();
                      const { name } = res.data.resetPassword;
                      this.setState({
                        confirmPassword: "",
                        password: ""
                      });
                      if (!error && !loading && called) {
                        toast.success(
                          `Wellcome back Mr. ${name}. Your Password has been reset`,
                          {
                            position: toast.POSITION.BOTTOM_RIGHT
                          }
                        );
                        Router.push("/");
                      }
                    }}
                  >
                    {loading && (
                      <Progress bar animated color="success" value="100">
                        Please Wait
                      </Progress>
                    )}

                    <fieldset disabled={loading} aria-busy={loading}>
                      <div className="custom-col">
                        {loading ? (
                          <>
                            <div className="text-center ">
                              <h2>Saving New Password to database...</h2>
                            </div>
                          </>
                        ) : (
                          <h2>Reset Passwrod</h2>
                        )}
                        {error && <Alert color="danger">{error.message}</Alert>}
                        <FormGroup>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            type={"password"}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleInput}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="confirmPassword">
                            Confirm Password
                          </Label>
                          <Input
                            type={this.state.showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="confirm your Password"
                            value={confirmPassword}
                            onChange={this.handleInput}
                          />
                          <Label check>
                            <Input
                              onChange={this.passwordVisible}
                              type="checkbox"
                            />{" "}
                            Show Password
                          </Label>
                        </FormGroup>{" "}
                        <Button color="primary">
                          Submit{loading ? "ing..." : ""}
                        </Button>
                      </div>
                    </fieldset>
                  </Form>
                </Container>
              </Card>
            </AuthStyles>
          );
        }}
      </Mutation>
    );
  }
}

export default PasswordReserForm;
