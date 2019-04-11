import React, { Component } from "react";
import Blogs from "./../components/Blogs/Blogs";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

export class BlogsPage extends Component {
  render() {
    return (
      <>
        <HeaderBaseLayout />
        <div className="p-top">
          <Blogs />
        </div>
      </>
    );
  }
}

export default BlogsPage;
