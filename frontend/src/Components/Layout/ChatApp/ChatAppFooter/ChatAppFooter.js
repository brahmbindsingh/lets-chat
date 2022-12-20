import React, { useEffect, useState } from "react";
import "./ChatAppFooter.css";
import { useDispatch } from "react-redux";
import { newMessage } from "../../../../actions/roomMessageAction";

const ChatAppFooter = (props) => {

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!message){
      return;
    }
    dispatch(newMessage(props.roomId, message, props.Socket));
    setMessage('');
    let allMessages = document.querySelectorAll("#messages li");
    allMessages[allMessages.length-1].scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="chat-app_footer">
      {console.log(props.Socket)}
      <form>
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
