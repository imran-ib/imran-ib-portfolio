import React, { Component } from "react";
import Portfolio from "./../components/Portfolio/Portfolio";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

class PortfolioPage extends Component {
  render() {
    return (
      <>
        <HeaderBaseLayout />
        <Portfolio />
      </>
    );
  }
}

export default PortfolioPage;
