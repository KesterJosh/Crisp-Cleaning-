// components/PrivateRoute.jsx
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? <Component {...props} /> : <Redirect to="/#/" />
      }
    />
  );
};

export default PrivateRoute;
