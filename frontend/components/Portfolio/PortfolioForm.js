import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import FormFileds from "./../utills/Forms/FormFiled";
import DateField from "./../utills/Forms/FormFieldDate";
import { Button, Row, Col, Progress, Alert } from "reactstrap";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { toast } from "react-toastify";
import Router from "next/router";
import { GET_ALL_PORTFOLIOS } from "./PortfolioCard";

const CREATE_PORTFOLIO_MUTATION = gql`
  mutation CREATE_PORTFOLIO_MUTATION(
    $title: String!
    $company: String!
    $location: String!
    $position: String!
    $description: String!
    $startDate: DateTime
    $endDate: DateTime
  ) {
    createPortfolio(
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

class PortfolioForm extends Component {
  state = {
    title: "New Job",
    company: "New Company",
    location: "Karachi",
    position: "Senior Web Developer",
    description: "I am currently working at some Companey",
    startDate: "2019-03-20T14:31:23.313Z",
    endDate: "2019-03-30T14:31:23.313Z"
  };

  render() {
    return (
      <div>
        <Mutation
          mutation={CREATE_PORTFOLIO_MUTATION}
          refetchQueries={[{ query: GET_ALL_PORTFOLIOS }]}
        >
          {(createPortfolio, { loading, error, called }) => {
            {
              if (!error && !loading && called) {
                toast.success(`New Portfolio has been added`, {
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
                  initialValues={this.state}
                  validate={FormValidation}
                  onSubmit={async values => {
                    const res = await createPortfolio({
                      variables: values
                    });
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
                            Date={initialValues.startDate}
                            component={DateField}
                          />
                          <Field
                            label="EndDate"
                            type="text"
                            name="endDate"
                            canBeDisabled={true}
                            Date={initialValues.endDate}
                            component={DateField}
                          />
                          <Button
                            disabled={loading}
                            color="success"
                            type="submit"
                          >
                            Creat{loading ? "ing..." : "e"}
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
      </div>
    );
  }
}

export default PortfolioForm;
