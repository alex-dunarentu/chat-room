import React from "react";
import "./chat.styles.css";

const Chat = ({ datab }) => {
  return (
    <div className="chat">
      {datab.map((data) => {
        return (
          <li className="list-group-item" key={data.username}>
            <span className="Username">{data.username} </span>
            <span className="Message">{data.message} </span>
            <div className="Time">{data.created_at.seconds}s ago</div>
          </li>
        );
      })}
    </div>
  );
};

export default Chat;
