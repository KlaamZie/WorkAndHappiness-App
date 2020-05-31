import React from "react";
import { Route, Redirect } from "react-router-dom";

let uid = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");

export const MailValidationRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!uid) {
        localStorage.setItem("14122013", true);
        return <Redirect to="/" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);
