import React from "react";
import userPic from "../../../../assets/avatar/man.png";
import "./MessageCard.css";
import { useSelector } from "react-redux";

const MessageCard = (props) => {
  const { user } = useSelector((state) => state.user);
  const userStyles = {
    borderRadius: "",
    flexDirection: "row-reverse",
    right: "0px",
    marginLeft: "auto",
  };
  return (
    <div
      className="message-card"
      style={{
        flexDirection: user._id === props.from._id && "row-reverse",
        right: user._id === props.from._id && "0",
        marginLeft: user._id === props.from._id && "auto",
      }}
    >
      <div className="user-info">
        <img
          src={userPic}
          style={{
            marginLeft: user._id === props.from._id && "10px",
            marginRight: user._id === props.from._id && "0",
          }}
          alt=""
        />
        <p className="timestamp">{}</p>
      </div>
      <div
        className="message-details"
        style={{
          borderRadius: user._id === props.from._id && "8px 0 8px 8px",
          background: user._id === props.from._id && "#4e426a",
          color: user._id === props.from._id && "white"
        }}
      >
        <h4 className="sender">{props.from.name}</h4>
        <p className="message">{props.msg}</p>
      </div>
    </div>
  );
};

export default MessageCard;
