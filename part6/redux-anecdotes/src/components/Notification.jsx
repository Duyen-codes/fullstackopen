import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  if (notification.length === 0) {
    return "";
  }
  return <div style={style}>{`You voted '${notification.notification}'`}</div>;
};

export default Notification;
