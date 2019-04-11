import React from "react";
import { FormGroup, Label, Input } from "reactstrap";
import styled from "styled-components";

const FormFileds = ({
  type,
  label,
  field, //{ name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <FormFiledsStyles>
    <FormGroup>
      <Label>{label}</Label>
      <Input className="form-control" type={type} {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error custum__error">{errors[field.name]}</div>
      )}
    </FormGroup>
  </FormFiledsStyles>
);

export const FormFiledsStyles = styled.div`
  .custum__error {
    color: red;
    font-weight: 500;
  }
`;

export default FormFileds;
