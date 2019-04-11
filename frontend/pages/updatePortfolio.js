import React from "react";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";
import PleaseSignin from "./../components/Authentication/PleaseSignin.js/PleaseSignin";
import UpdatePortfolio from "./../components/Portfolio/PortfolioUpdateForm";

const updatePortfolioPage = props => {
  return (
    <>
      <HeaderBaseLayout />
      <div className="p-top">
        <UpdatePortfolio id={props.query.id} />
      </div>
    </>
  );
};

export default updatePortfolioPage;
