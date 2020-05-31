import React from "react";
import { Route } from "react-router-dom";

let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)_060698\s*\s*([^;]*).*$)|^.*$/, "$1");

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
        if(!cookieValue) {
            return window.location = "/";
        }
        else {
            return <Component {...props} />;
        }
    }}
  />
);
