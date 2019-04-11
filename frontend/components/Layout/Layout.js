import React from "react";
import Meta from "./../Meta/Meta";
import styled, { ThemeProvider } from "styled-components";
import theme from "../Styles/Theme";
import GlobalStyle from "./../Styles/GlobalStyles";

function Layout(props) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Meta />
        {props.childred}
      </>
    </ThemeProvider>
  );
}

export default Layout;
