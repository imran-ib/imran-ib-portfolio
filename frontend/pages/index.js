import React, { Component } from "react";
import Home from "./../components/Home/Home";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

class index extends React.Component {
  render() {
    return (
      <>
        <HeaderBaseLayout headerType="index" />
        <Home />
      </>
    );
  }
}

export default index;
