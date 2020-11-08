import React from "react";
import "./App.css";
import send from "./components/assets/icons/send.svg";
import rename from "./components/assets/icons/rename.svg";

const App = () => {
  const handleMessage = (event) => {
    event.preventDefault();
    console.log("ok");
  };
  const handleName = (event) => {
    event.preventDefault();
    console.log("ok");
  };
  return (
    <div className="App">
      <div className="container my-4">
        <h1 className="my-4 text-center">ChatRoom </h1>
        <div className="chat-rooms mb-3 text-center">
          <div className="my-2">Choose a chatroom:</div>
          <button className="btn" id="general">
            #general
          </button>
          <button className="btn" id="gaming">
            #gaming
          </button>
          <button className="btn" id="music">
            #music
          </button>
        </div>

        <div className="chat-window">
          <ul className="chat-list list-group"></ul>
        </div>
        <form className="new-chat my-3" onSubmit={handleMessage}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">Your message:</div>
            </div>
            <input type="text" id="message" className="form-control" required />
            <div className="input-group-append">
              <button type="submit" className="btn">
                <img src={send} className="ButtonImage" alt="send" />
              </button>
            </div>
          </div>
        </form>
        <form className="new-name my-3" onSubmit={handleName}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">Update name:</div>
            </div>
            <input type="text" id="name" className="form-control" required />
            <div className="input-group-append">
              <button type="submit" className="btn">
                <img src={rename} className="ButtonImage" alt="rename" />
              </button>
            </div>
          </div>
          <div className="update-mssg"></div>
        </form>
      </div>
    </div>
  );
};

export default App;
