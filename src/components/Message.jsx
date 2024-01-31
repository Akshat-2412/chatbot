// src/components/Message.js
import React from "react";

const Message = ({ content, type }) => {
  console.log("content", content);
  return (
    <>
      {content.selectedOption != null ? (
        <div style={{backgroundColor:"white", display:"flex", justifyContent:"end"}}>
          <div className="Question">{content.selectedOption}</div>
        </div>
      ) : (
        <>
          <div className="Answer">{content.content}</div>
        </>
      )}
    </>
  );
};

export default Message;
