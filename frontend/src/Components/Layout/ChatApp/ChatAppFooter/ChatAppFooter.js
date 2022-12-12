import React, { useState } from "react";
import "./ChatAppFooter.css";
import sendIcon from "./sendIcon.png";
import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { newMessage } from "../../../../actions/roomMessageAction";

const Socket = io();

const ChatAppFooter = (props) => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!message){
      return;
    }
    dispatch(newMessage(props.roomId, message, Socket));
    // Socket.emit("new-message", message);
    setMessage('');
  }

  return (
    <div className="chat-app_footer">
      <form action="">
        <input
          type="text"
          placeholder="Type a message ..."
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <button onClick={handleSubmit}>
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatAppFooter;
