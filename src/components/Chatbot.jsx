// src/components/Chatbot.js
import React from "react";
import Message from "./Message";
import Options from "./Options";

const Chatbot = ({ conversation, currentStep, onUserResponse, chat, cart }) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div style={{ backgroundColor: "white" }}>
        {chat.map((message, index) => (
          <Message key={index} content={message} type={message.type} />
        ))}
      </div>
      <div className="OptionsBox" style={{ backgroundColor: "white" }}>
        {cart.length < 1 && currentStep  && (
          <Options
            options={conversation[currentStep]}
            onUserResponse={onUserResponse}
          />
        )}
      </div>
    </div>
  );
};

export default Chatbot;
