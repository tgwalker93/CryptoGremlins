import React from "react";

export const Col = props =>
  <div className={props.size.split(" ").map(size => "col-" + size).join(" ")} {...props}>
    {props.children}
  </div>;
