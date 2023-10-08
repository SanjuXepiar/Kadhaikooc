import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/authrelated";
function PrivateRoute({ ...rest }) {
  let location = useLocation();
  return isAuthenticated() ? (
    <Route {...rest} />
  ) : (
    <Navigate state={{ from: location.pathname }} replace to="/authenticate" />
  );
}

export default PrivateRoute;
