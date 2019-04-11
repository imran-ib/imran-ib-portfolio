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

const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!) {
    SignIn(email: $email, password: $password) {
      name
      email
    }
  }
`;

class LonginForm extends Component {
  state = {
    showPassword: false,
    email: "",
    password: ""
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
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={LOGIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(Signin, { error, loading }) => {
          return (
            <AuthStyles>
              <Form
                method="POST"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await Signin();
                  const { name } = res.data.SignIn;
                  this.setState({
                    email: "",
                    password: ""
                  });
                  if (!error) {
                    toast.success(`Wellcome back Mr. ${name}`, {
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 3000
                    });
                  }
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="custom-col">
                    {loading ? (
                      <>
                        <div className="text-center ">
                          <h2>Logingin...</h2>
                        </div>
                      </>
                    ) : (
                      <h2>Login</h2>
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
                    <FormGroup>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type={this.state.showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
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
            </AuthStyles>
          );
        }}
      </Mutation>
    );
  }
}

export default LonginForm;
