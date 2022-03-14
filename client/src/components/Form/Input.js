import React from "react";

export const Input = props =>
  <div className={props.formgroupclass}>

    <input className="form-control" {...props} />
    {props.isvalid === "true" ? "" : <span className="help-block">{props.fielderror}</span>}
  </div>;
