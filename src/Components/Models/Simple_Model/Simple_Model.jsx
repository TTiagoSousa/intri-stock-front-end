import React, { useState } from "react";
import './Simple_Model.scss';
import useBodyScrollLock from "../../../Hooks/ui/useBodyScrollLock";

const Simple_Model = ({ visible, setVisible, title, content }) => {
  const onClose = () => setVisible(false);

  useBodyScrollLock(visible);

  return (
    <div className={`Simple_Model ${visible ? 'Show' : 'Hide'}`} onClick={onClose}>
      <div className="Model_Container" onClick={(e) => e.stopPropagation()}>
        <div className="Model_Header">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose}>X</button>
        </div>
        <div className="Model_Content">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default Simple_Model;