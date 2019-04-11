import React from "react";
import PasswordResetFomr from "./../components/Authentication/Reset/PasswordResetFomr";
import HeaderBaseLayout from "./../components/Layout/HeaderBaseLayout";

function reset(props) {
  return (
    <>
      <HeaderBaseLayout />
      <div className="p-top">
        <PasswordResetFomr resetToken={props.query.resetToken} />
      </div>
    </>
  );
}

export default reset;
