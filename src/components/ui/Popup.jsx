import React, { Component } from "react";

export default class Popup extends Component {
  render() {
    const { children, onClick, className } = this.props;
    return (
      <>
        <div
          className="fixed top-0 left-0 bg-black/30 h-screen w-full"
          onClick={onClick}
        ></div>
        <div
          className={`fixed top-[50%] left-[50%] -translate-1/2 ${className}`}
        >
          {children}
        </div>
      </>
    );
  }
}
