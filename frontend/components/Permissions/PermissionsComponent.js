import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import {
  Table,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Alert,
  Button
} from "reactstrap";
import { toast } from "react-toastify";
import styled from "styled-components";

const UserDataStyles = styled.div`
  .p-input {
    padding: 10px;
    margin-left: 40px;
  }
  .heading-center {
    h1 {
      margin-bottom: 50px;
      font-size: 60px;
      font-weight: 400;
      width: 100vw;
      text-align: center;
      margin-left: auto;
    }
  }
`;

const UPDATE_PERMISSION_MUTATION = gql`
  mutation UPDATE_PERMISSION_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermission(permissions: $permissions, userId: $userId) {
      id
      name
      email
      permissions
    }
  }
`;

const GET_ALL_USERS_QUERY = gql`
  query GET_ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;
const permissionsList = [
  "ADMIN",
  "USER",
  "ADDBLOG",
  "UPDATEBLOG",
  "EDITBLOG",
  "DELETEBLOG",
  "UPRDATEPERMISSION"
];

class PermissionsComponent extends Component {
  render() {
    return (
      <Query query={GET_ALL_USERS_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Alert color="danger">{error.message}</Alert>;
          const { users } = data;
          return (
            <UserDataStyles>
              <div>
                <div className="heading-center">
                  <h1>Manage Permissions</h1>
                </div>
                <Table dark>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>Email</th>
                      {permissionsList.map((permission, i) => (
                        <th key={i}>{permission}</th>
                      ))}
                      <th> 🔻 </th>
                    </tr>
                  </thead>
                  {users.map(user => (
                    <UserData user={user} key={user.id} />
                  ))}
                </Table>
              </div>
            </UserDataStyles>
          );
        }}
      </Query>
    );
  }
}

class UserData extends Component {
  state = {
    permissions: this.props.user.permissions
  };
  handlerPermission = e => {
    const checkbox = e.target;
    // take copy of current permissions
    let updatedPermissions = [...this.state.permissions];
    // figure out if permission need to be cheked or unchecked
    if (checkbox.checked) {
      //add it in
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        permission => permission !== checkbox.value
      );
    }
    this.setState({
      permissions: updatedPermissions
    });
  };
  render() {
    const { user } = this.props;
    return (
      <Mutation
        mutation={UPDATE_PERMISSION_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id
        }}
      >
        {(updatePermission, { loading, error, called }) => {
          return (
            <>
              {error && (
                <tr>
                  <td colSpan={12}>
                    {" "}
                    <Alert color="danger">{error.message}</Alert>
                  </td>
                </tr>
              )}
              {!error && !loading && called && (
                <tr>
                  <td colSpan={12}>
                    <Alert color="success">
                      <p className="alert-heading">Success! 😃</p>
                      <p>
                        Permissions updated for <b> {user.email} </b>, New
                        Permissions are
                        {this.state.permissions.map(persmission => (
                          <>
                            {" "}
                            <hr />
                            {persmission}
                          </>
                        ))}
                      </p>
                      `
                    </Alert>
                  </td>
                </tr>
              )}
              <tbody>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {permissionsList.map(permission => (
                    <td key={permission}>
                      <UserDataStyles>
                        <Form>
                          <FormGroup check inline>
                            <Label
                              htmlFor={`${user.id}-permission-${permission}`}
                            >
                              <CustomInput
                                className="p-input"
                                id={`${user.id}-permission-${permission}`}
                                checked={this.state.permissions.includes(
                                  permission
                                )}
                                type="checkbox"
                                value={permission}
                                onChange={this.handlerPermission}
                              />
                            </Label>
                          </FormGroup>
                        </Form>
                      </UserDataStyles>
                    </td>
                  ))}
                  <td>
                    <Button
                      disabled={loading}
                      onClick={updatePermission}
                      color="primary"
                    >
                      Updat{loading ? "ing" : "e"}
                    </Button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        }}
      </Mutation>
    );
  }
}

export default PermissionsComponent;
