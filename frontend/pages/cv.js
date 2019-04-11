import React, { Component } from "react";
import Cv from "./../components/Cv/Cv";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

export class CvPage extends Component {
  render() {
    return (
      <>
        <HeaderBaseLayout />
        <div className="p-top">
          <Cv />
        </div>
      </>
    );
  }
}

export default CvPage;
