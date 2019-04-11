import React from "react";
import { Row, Col, Container, Card, CardGroup } from "reactstrap";
import LoginForm from "./../components/Authentication/Login/LoginForm";
import Register from "./../components/Authentication/Register/RegisterForm";
import ResetForm from "./../components/Authentication/Reset/ResetForm";
import styled from "styled-components";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

const AuthStylesThis = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 100%;
  .card-csutom {
    background: #fff;
  }
  .custom-col {
    text-transform: uppercase;
    opacity: 0.8;
    box-shadow: -23px 28px 35px -1px rgba(0, 0, 0, 0.56);
    border-radius: 5px;
    margin-right: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    padding: 40px;

    display: flex; /* nested flex container */
    flex-direction: column; /* vertical alignment of flex items */
    justify-content: center; /* center flex items vertically */
    align-items: center;
    &:last-child {
      flex: 1;
    }
    &:first-child {
      flex: 3; /* consume 3x more free space than sibling */
    }
  }
`;
const auth = () => {
  return (
    <>
      <HeaderBaseLayout />
      <Container>
        <Row>
          <AuthStylesThis className="p-top">
            <CardGroup>
              <Col className="custom-col" lg={4}>
                <Card>
                  <div className="card-csutom">
                    <LoginForm />
                  </div>
                </Card>
              </Col>

              <Col className="custom-col" lg={4}>
                <Card>
                  <Register />
                </Card>
              </Col>
              <Col className="custom-col" lg={4}>
                <Card>
                  <ResetForm />
                </Card>
              </Col>
            </CardGroup>
          </AuthStylesThis>
        </Row>
      </Container>
    </>
  );
};

export default auth;
