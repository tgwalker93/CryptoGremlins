import React from "react";

export const FormBtn = props =>
  <button {...props} className="btn btn-pill btn-light btn-lg">
    {props.children}
  </button>;
