// src/components/Options.js
import React from 'react';

const Options = ({ options, onUserResponse }) => {
  console.log("vdfd", options)
  return (
    <div className="Options">
      {options.option.map((label, index) => (
        <button key={index} onClick={() => onUserResponse(options,label,options.quantity)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default Options;
