import React from "react";

export const CommentPanel = props => (
    <div className='panel panel-default'>
        <div className='panel-body note-panel'>
            {props.children}
            <p className="comment-text"><strong>{props.name}</strong>: {props.text} </p>
            <p className="date-text">{props.date}</p>
        </div>
    </div>
);