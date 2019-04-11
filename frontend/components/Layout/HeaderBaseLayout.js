// making this component because we need to pass some props to each page

import React from "react";
import Header from "./../Header/Header";
import styled from "styled-components";

const NavDefaultStyles = styled.nav`
  .port-navbar .port-nav-base .port-nav-default {
    padding: 30px;
    background-color: ${props => props.theme.secondary} !important;
  }
`;

function HeaderBaseLayout(props) {
  const headerType = props.headerType || "default";
  return (
    <NavDefaultStyles>
      <Header headerType={headerType} className={`port-nav-${headerType}`} />
      {props.childred}
    </NavDefaultStyles>
  );
}

export default HeaderBaseLayout;
