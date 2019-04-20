import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

const ButtonStyles = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
  margin-bottom: 20px;
  .left-block {
    align-self: auto;
    display: flex;
    div {
      padding: 14px;
    }
  }
  h1 {
    font-weight: 700;
  }
`;

export default function SaveButton() {
  return (
    <ButtonStyles>
      <h1>Write You Story... 😊</h1>
      <div className="left-block">
        <div>Saved</div>
        <Button color="success"> Save</Button>
      </div>
    </ButtonStyles>
  );
}
