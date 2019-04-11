import React, { Component } from "react";
import { AuthStyles } from "../AuthStyles";
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
import { toast } from "react-toastify";
import Router from "next/router";

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    RegisterUser(email: $email, password: $password, name: $name) {
      id
      name
      email
    }
  }
`;

class RegisterForm extends Component {
  state = {
    showPassword: false,
    name: "",
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
    const { name, email, password } = this.state;
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(RegisterUser, { error, loading }) => {
          return (
            <AuthStyles>
              <Form
                method="POST"
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await RegisterUser();
                  this.setState({
                    name: "",
                    email: "",
                    password: ""
                  });
                  if (!error) {
                    toast.success(`Hello ${name}`, {
                      position: toast.POSITION.BOTTOM_RIGHT
                    });
                    Router.push("/");
                  }
                }}
              >
                <fieldset disabled={loading} aria-busy={loading}>
                  <div className="custom-col">
                    {loading ? (
                      <>
                        <div className="text-center ">
                          <h2>Registering</h2>
                        </div>
                      </>
                    ) : (
                      <h2> Register</h2>
                    )}
                    {loading && (
                      <Progress bar animated color="success" value="100">
                        Please Wait
                      </Progress>
                    )}
                    {error && <Alert color="danger">{error.message}</Alert>}
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={this.handleInput}
                      />
                    </FormGroup>
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

export default RegisterForm;
export { CREATE_USER_MUTATION };
