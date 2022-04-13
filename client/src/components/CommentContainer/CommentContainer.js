import React from "react";


export const CommentContainer = ({ children }) => (
    <div id="wrapper">
        <div id="bugs">
            {children}
        </div>
        <div id="comments"></div>
    </div>
);