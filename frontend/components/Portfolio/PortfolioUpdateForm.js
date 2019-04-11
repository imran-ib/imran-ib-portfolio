import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import FormFileds from "./../utills/Forms/FormFiled";
import DateField from "./../utills/Forms/FormFieldDate";
import { Button, Row, Col, Progress, Alert, Container } from "reactstrap";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import Router from "next/router";
import { ProtfolioStyled } from "./ProtfolioStyles";
import { GET_ALL_PORTFOLIOS } from "./PortfolioCard";

const GET_SINGLE_PORTFOLIO_QUERY = gql`
  query GET_SINGLE_PORTFOLIO_QUERY($id: ID!) {
    portfolios(where: { id: $id }) {
      id
      title
      company
      position
      location
      description
      startDate
      endDate
    }
  }
`;
const UPDATE_PORTFOLIO_MUTATION = gql`
  mutation UPDATE_PORTFOLIO_MUTATION(
    $id: ID!
    $title: String!
    $company: String!
    $location: String!
    $position: String!
    $description: String!
    $startDate: DateTime
    $endDate: DateTime
  ) {
    updatePortfolio(
      id: $id
      title: $title
      company: $company
      location: $location
      position: $position
      description: $description
      startDate: $startDate
      endDate: $endDate
    ) {
      id
    }
  }
`;

const FormValidation = values => {
  let errors = {};

  Object.keys(values).map(function(key, index) {
    if (!values[key]) {
      errors[key] = `Field ${key} is requred`;
    }
  });
  //1. get startDate and endDate into consts
  const { startDate, endDate } = values;
  //2. check if endDate is before start date if so throw error
  // we can use isBefore() from moment
  if (endDate && startDate && endDate.isBefore(startDate)) {
    errors.endDate = "End Date cannot be before Start Date";
  }
  return errors;
};

class UpdatePortfolio extends Component {
  state = {
    title: "",
    company: "",
    location: "",
    position: "",
    description: "",
    startDate: "",
    endDate: ""
  };

  render() {
    return (
      <Container>
        <ProtfolioStyled>
          <h1>Update Your Portfolio</h1>
          <Query
            query={GET_SINGLE_PORTFOLIO_QUERY}
            variables={{ id: this.props.id }}
          >
            {({ data: { portfolios }, error, loading }) => {
              {
                error && <Alert color="danger">{error.message}</Alert>;
              }
              {
                loading && called && (
                  <Progress bar animated color="success" value="100">
                    Please Wait
                  </Progress>
                );
              }
              return (
                <Mutation
                  mutation={UPDATE_PORTFOLIO_MUTATION}
                  refetchQueries={[{ query: GET_ALL_PORTFOLIOS }]}
                >
                  {(updatePortfolio, { loading, error, called }) => {
                    {
                      if (!error && !loading && called) {
                        toast.success(`New Portfolio has been Updated`, {
                          position: toast.POSITION.BOTTOM_RIGHT
                        });
                        Router.push({
                          pathname: "/portfolio"
                        });
                      }
                    }

                    return (
                      <>
                        {error && <Alert color="danger">{error.message}</Alert>}
                        {loading && called && (
                          <Progress bar animated color="success" value="100">
                            Please Wait
                          </Progress>
                        )}

                        <Formik
                          initialValues={portfolios[0]}
                          validate={FormValidation}
                          onSubmit={async values => {
                            const res = await updatePortfolio(
                              console.log(values) || {
                                variables: {
                                  id: this.props.id,
                                  ...values
                                }
                              }
                            );
                          }}
                        >
                          {({ initialValues }) => (
                            <Row>
                              <Col md="6">
                                <Form>
                                  <Field
                                    label="Title"
                                    type="text"
                                    name="title"
                                    component={FormFileds}
                                  />
                                  <Field
                                    label="Company"
                                    type="text"
                                    name="company"
                                    component={FormFileds}
                                  />
                                  <Field
                                    label="Location"
                                    type="text"
                                    name="location"
                                    component={FormFileds}
                                  />
                                  <Field
                                    label="Position"
                                    type="text"
                                    name="position"
                                    component={FormFileds}
                                  />
                                  <Field
                                    label="Description"
                                    type="textarea"
                                    name="description"
                                    component={FormFileds}
                                  />
                                  <Field
                                    label="StartDate"
                                    type="text"
                                    name="startDate"
                                    date={initialValues.startDate}
                                    component={DateField}
                                  />
                                  <Field
                                    label="EndDate"
                                    type="text"
                                    name="endDate"
                                    canBeDisabled={true}
                                    date={initialValues.endDate}
                                    component={DateField}
                                  />
                                  <Button
                                    disabled={loading}
                                    color="success"
                                    type="submit"
                                  >
                                    Updat{loading ? "ing..." : "e"}
                                  </Button>
                                </Form>
                              </Col>
                            </Row>
                          )}
                        </Formik>
                      </>
                    );
                  }}
                </Mutation>
              );
            }}
          </Query>
        </ProtfolioStyled>
      </Container>
    );
  }
}

export default UpdatePortfolio;
