import React, { useState } from "react";
import Chat from "./components/chat/chat.component";
import { db, addChat, getChats } from "./firebase/firebase.utils";

import rename from "./assets/icons/rename.svg";
import send from "./assets/icons/send.svg";
import "./App.css";

const App = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [changes, setChanges] = useState(false);
  const chats = db.collection("chats");
  const [datab, setDatab] = useState([]);
  const [unsub, setUnsub] = useState(null);
  const handleMessage = (event) => {
    event.preventDefault();
    if (username.length < 3) {
      alert("no username set");
      setUsername("");
    } else if (room.length < 1) {
      alert("no room set");
    } else {
      addChat(message, username, room, chats);
      setUnsub(
        getChats(
          chats,
          (data) => {
            setDatab(data);
          },
          room
        )
      );
    }
  };
  const handleName = (event) => {
    event.preventDefault();
    if (username.length < 3) {
      alert("not a valid username");
      setUsername("");
    }
  };

  const handleRoom = (event) => {
    setRoom(event.target.value);
    if (unsub) {
      unsub();
    } else {
      getChats(
        chats,
        (data) => {
          setDatab(data);
        },
        event.target.value
      );
    }
  };
  return (
    <div className="App">
      <div className="container my-4">
        <h1 className="my-4 text-center">ChatRoom </h1>
        <div className="chat-rooms mb-3 text-center">
          <div className="my-2">Choose a chatroom:</div>
          <button
            className="btn"
            id="general"
            value="general"
            onClick={(event) => {
              handleRoom(event);
            }}
          >
            #general
          </button>
          <button
            className="btn"
            id="gaming"
            value="gaming"
            onClick={(event) => {
              handleRoom(event);
            }}
          >
            #gaming
          </button>
          <button
            className="btn"
            id="music"
            value="music"
            onClick={(event) => {
              handleRoom(event);
            }}
          >
            #music
          </button>
        </div>

        <div className="chat-window">
          <ul className="chat-list list-group">
            {room.length > 1 ? <Chat datab={datab} /> : ""}
          </ul>
        </div>
        <form className="new-name my-3" onSubmit={handleName}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                {changes ? "Update name:" : "Your name:"}
              </div>
            </div>
            <input
              type="text"
              id="name"
              className="form-control"
              value={username}
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn"
                onClick={() => {
                  if (username.length > 2) {
                    setChanges(true);
                  }
                }}
              >
                <img src={rename} className="ButtonImage" alt="rename" />
              </button>
            </div>
          </div>
          <div className="update-mssg"></div>
        </form>
        <form className="new-chat my-3" onSubmit={handleMessage}>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">Your message</div>
            </div>
            <input
              type="text"
              id="message"
              className="form-control"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              required
            />
            <div className="input-group-append">
              <button type="submit" className="btn">
                <img src={send} className="ButtonImage" alt="send" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
