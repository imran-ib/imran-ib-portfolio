import React from "react";
import About from "./../components/About/About";
import PleaseSignin from "../components/Authentication/PleaseSignin.js/PleaseSignin";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

const AboutPage = () => {
  return (
    <>
      <HeaderBaseLayout />
      <div className="p-top">
        <PleaseSignin>
          <About />
        </PleaseSignin>
      </div>
    </>
  );
};

export default AboutPage;
