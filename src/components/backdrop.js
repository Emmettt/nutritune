import React from 'react';
import './backdrop.css';

function BackDrop(props) {
  return <div className="backdrop">{props.children}</div>;
}

export default BackDrop;
