// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Chatbot from "./components/Chatbot";
import Card from "./components/Card";
import Modal from "./components/Modal";

const App = () => {
  const [boxChat, setboxChat] = useState([]);

  const [chat, setChat] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [cart, setCart] = useState([]);

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [userInputValue, setUserInputValue] = useState("");

  const [conversation, setConversation] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the input value, e.g., send it to an API, store it, etc.
    console.log("Input submitted:", inputValue);
    setCart({ quantity: inputValue });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUserResponse = (response, option, quantity) => {
    // Update chat state and current step based on user response\

    let temp = chat;
    temp.push({ selectedOption: option });
    if (option === "Yes" && response.type === "input") {
      handleOpen();
    } else if (option === "Yes" && response.type === "cart") {
      setCart(response);
    } else if (option === "No") {
      temp.push(response);
      setCurrentStep(currentStep + 1);
    }
    setChat(temp);
  };

  useEffect(() => {
    setboxChat([
      { content: "Hi", type: "bot" },
      { content: "What do you want to order? (Sugar, Flour)", type: "bot" },
    ]);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Ordering Chatbot</h1>
      {loading ? (
        <div className="InputBox">
          <div style={{ background: "transparent" }}>
            {boxChat.map((ele) => {
              return (
                <>
                  <div
                    style={{
                      margin: "5px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {ele.content}
                  </div>
                </>
              );
            })}
          </div>
          <div style={{ background: "transparent", display: "flex" }}>
            <input
              type="text"
              value={userInputValue}
              onChange={(e) => {
                setUserInputValue(e.target.value);
              }}
              placeholder="Type....."
              style={{
                margin: "5px",
                background: "transparent",
                height: "30px",
                width: "90%",
                padding: "5px",
                borderRadius: "5px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "transparent",
                margin: "5px",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => {
                console.log(userInputValue);
                if (userInputValue.toLocaleLowerCase() === "sugar") {
                  setConversation([
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
                      quantity: 0.1,
                      content: "I see. Would you like a different quantity?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "input",
                      quantity: 0.1,
                      content:
                        "Alright. How about a different type of sugar, like brown sugar?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "option",
                      quantity: 0.1,
                      content:
                        "Alright. How about a different type of sugar, like brown sugar?",
                      option: ["Yes", "No"],
                    },
                  ]);
                  setChat([
                    {
                      type: "cart",
                      quantity: 1,
                      content:
                        "Hello! Ready to order sugar? Based on your history, do you want 1 kg sugar?",
                      option: ["Yes", "No"],
                    },
                  ]);
                  setLoading(false);
                } else if (userInputValue.toLocaleLowerCase() === "flour") {
                  setConversation([
                    {
                      type: "cart",
                      quantity: 1,
                      content:
                        "Hello! Ready to order flour? Based on your history, do you want 1 kg flour?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "cart",
                      quantity: 1,
                      content: "Got it. Would you like to order 500 gm flour?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "cart",
                      quantity: 0.5,
                      content: "Okay. How about 100 gm flour then?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "cart",
                      quantity: 0.1,
                      content: "I see. Would you like a different quantity?",
                      option: ["Yes", "No"],
                    },
                    {
                      type: "option",
                      quantity: 0.1,
                      content: "Alright. Do you want anything else?",
                      option: ["Yes", "No"],
                    },
                  ]);
                  setChat([
                    {
                      type: "cart",
                      quantity: 1,
                      content:
                        "Hello! Ready to order flour? Based on your history, do you want 1 kg flour?",
                      option: ["Yes", "No"],
                    },
                  ]);
                  setLoading(false);
                } else {
                  alert("Enter sugar or flour");
                }
                let temp = boxChat;
                temp.push({ content: userInputValue, type: "user" });
                setboxChat(temp);
              }}
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <div className="App">
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
              {true ? <Card content={cart} /> : <></>}
            </div>
          </div>
        </div>
      )}

      <Modal isOpen={open}>
        <>
          <form
            onSubmit={handleSubmit}
            style={{ background: "transparent", padding: "5px" }}
          >
            <label
              style={{
                margin: "5px",
                background: "transparent",
                fontSize: "20px",
                textAlign: "left",
              }}
            >
              Enter Quantity (in Kg):
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              style={{
                margin: "5px",
                background: "transparent",
                height: "30px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "transparent",
                margin: "5px",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              Submit
            </button>
          </form>
        </>
      </Modal>
    </>
  );
};

export default App;
