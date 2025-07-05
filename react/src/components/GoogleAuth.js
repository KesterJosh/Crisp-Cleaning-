import React from "react";
import { GoogleLogin } from "@react-oauth/google";

const GoogleAuth = () => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log("Successful Login");
      }}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};
export default GoogleAuth;