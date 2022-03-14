import React from "react";
//({ fluid, children, props })
export const Row = props =>
  <div className={`row${props.fluid ? "-fluid" : ""}`} {...props}> 
    {props.children}
  </div>;
