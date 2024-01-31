import React from "react";

const Card = ({ content }) => {
  console.log("aaaa", content);
  return (
    <>
      <div className="card">
        <div>Sugar</div>
        <div>{content.quantity} Kg</div>
      </div>
    </>
  );
};

export default Card;
