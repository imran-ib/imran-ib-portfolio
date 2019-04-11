import React from "react";
import CreatePortfolio from "./../components/Portfolio/CreatePortfolio";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";
import PleaseSignin from "./../components/Authentication/PleaseSignin.js/PleaseSignin";

const padding = { paddingTop: "120px" };

const portfolioNew = () => {
  return (
    <>
      <HeaderBaseLayout />
      <PleaseSignin padding={padding}>
        <CreatePortfolio />
      </PleaseSignin>
    </>
  );
};

export default portfolioNew;
