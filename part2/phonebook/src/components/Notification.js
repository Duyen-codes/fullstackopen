import React from "react";

const Notification = ({ message }) => {
  if (Object.keys(message).length === 0) {
    return null;
  }
  return <div className={message.type}>{message.content}</div>;
};

export default Notification;
