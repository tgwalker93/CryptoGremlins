import React from "react";

export const Container = props =>
  <div className={`container${props.fluid === "true"  ? "-fluid" : ""}`} {...props}>
    {props.children}
  </div>;
