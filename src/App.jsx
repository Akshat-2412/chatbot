// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Chatbot from "./components/Chatbot";
import Card from "./components/Card";

const App = () => {
  const [chat, setChat] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [cart, setCart] = useState([]);

  const conversation = [
    {
      type: "cart",
      quantity: 1,
      content:
        "Hello! Ready to order sugar? Based on your history, do you want 1 kg sugar?",
      option: ["Yes", "No"],
    },
    {
      type: "cart",
      quantity: 1,
      content: "Got it. Would you like to order 500 gm sugar?",
      option: ["Yes", "No"],
    },
    {
      type: "cart",
      quantity: 0.5,
      content: "Okay. How about 100 gm sugar then?",
      option: ["Yes", "No"],
    },
    {
      type: "cart",
      quantity:0.1,
      content: "I see. Would you like a different quantity?",
      option: ["Yes", "No"],
    },
    {
      type: "cart",
      quantity:0.1,
      content:
        "Alright. How about a different type of sugar, like brown sugar?",
      option: ["Yes", "No"],
    },
    {
      type: "option",
      quantity:0.1,
      content:
        "Alright. How about a different type of sugar, like brown sugar?",
      option: ["Yes", "No"],
    },
  ];

  const handleUserResponse = (response, option,quantity) => {
    // Update chat state and current step based on user response\
    
    let temp = chat;
    temp.push({ selectedOption: option });
    if (option === "Yes" && response.type === "cart") {
      setCart(response);
    } else if (option === "No") {
      temp.push(response);
      setCurrentStep(currentStep + 1);
    }
    setChat(temp);
  };

  useEffect(() => {
    setChat([conversation[0]]);
  }, []);

  return (
    <div className="App">
      <h1>Ordering Chatbot</h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className="chatBox">
          <Chatbot
            conversation={conversation}
            currentStep={currentStep}
            onUserResponse={handleUserResponse}
            chat={chat}
            cart={cart}
          />
        </div>
        <div className="cart">
          <h1 style={{ backgroundColor: "transparent", color: "#3B3486" }}>
            Cart
          </h1>
          {true ? <Card content={cart} /> : <></> }
        </div>
      </div>
    </div>
  );
};

export default App;
