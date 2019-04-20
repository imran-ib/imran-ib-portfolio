import React, { Component } from "react";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";
import PleaseSignin from "./../components/Authentication/PleaseSignin.js/PleaseSignin";
import IsADMIN from "./../components/Authentication/IsAdmin/IsAdmin";
import BlogEditor from "./../components/Blogs/BlogEditor/BlogEditor";
import { Container } from "reactstrap";

class blogEditor extends Component {
  render() {
    return (
      <>
        <HeaderBaseLayout />
        <div className="p-top">
          <PleaseSignin>
            <IsADMIN>
              <Container>
                <BlogEditor />
              </Container>
            </IsADMIN>
          </PleaseSignin>
        </div>
      </>
    );
  }
}

export default blogEditor;
