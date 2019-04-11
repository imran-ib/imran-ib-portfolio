import React from "react";
import PermissionsComponent from "./../components/Permissions/PermissionsComponent";
import PleaseSignin from "./../components/Authentication/PleaseSignin.js/PleaseSignin";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

const PermissionsPage = () => {
  return (
    <>
      <HeaderBaseLayout />
      <div className="p-top">
        <PleaseSignin>
          <PermissionsComponent />
        </PleaseSignin>
      </div>
    </>
  );
};

export default PermissionsPage;
