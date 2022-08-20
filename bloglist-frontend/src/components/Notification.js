import React from "react";

const Notification = ({ errorMessage, setErrorMessage }) => {
  const notiStyle = {
    color: "green",
    padding: "3px",
    border: "2px solid green",
  };

  const errorStyle = {
    color: "red",
    padding: "3px",
    border: "2px solid red",
  };
  return (
    <div>
      <div style={errorMessage.type === "info" ? notiStyle : errorStyle}>
        <h2>{errorMessage.content}</h2>
      </div>
    </div>
  );
};

export default Notification;
