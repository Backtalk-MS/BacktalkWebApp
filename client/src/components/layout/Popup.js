import React, { Component } from "react";
import { PopupboxManager, PopupboxContainer } from "react-popupbox";

class Popup extends Component {
  openPopupbox(message) {
    const content = (
      <div>
        <p>{message}</p>
      </div>
    );
    return PopupboxManager.open({ content });
  }

  render() {
    return (
      <div>
        <PopupboxContainer />
      </div>
    );
  }
}

export default Popup;
