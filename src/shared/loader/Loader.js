import React from "react";
import "./Loader.css";

export const MiniLoader = ({ spinner, size }) => {
  return (
    <div className={`${spinner ? "white-circle" : "lds-circle"}`}>
      <div style={size}></div>
    </div>
  );
};

export const Loader = ({ spinner, size, select }) => {
  return (
    <div className={`${select ? "loader" : "content-loader"}`}>
      <MiniLoader spinner={spinner} size={size} />
    </div>
  );
};
