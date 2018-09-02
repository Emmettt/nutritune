import React from 'react';

import './modal-msg.css';

function ModalMsg(props) {
  return (
    <div className="modal">
      <h2>{props.msg}</h2>
      <button className="modalButton" onClick={props.hideUI}>
        OK
      </button>
    </div>
  );
}

export default ModalMsg;
