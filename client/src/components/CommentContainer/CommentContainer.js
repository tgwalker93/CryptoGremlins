import React from "react";


export const CommentContainer = ({ children }) => (
    <div id="wrapper">
        <div id="commentsContainer">
            {children}
        </div>
        <div id="comments"></div>
    </div>
);