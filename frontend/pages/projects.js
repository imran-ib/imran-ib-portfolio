import React, { Component } from "react";
import Projects from "./../components/Projects/Projects";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

export class ProjectsPage extends Component {
  render() {
    return (
      <>
        <HeaderBaseLayout />
        <div className="p-top">
          <Projects />
        </div>
      </>
    );
  }
}

export default ProjectsPage;
