import React from "react";

function Alart(props) {
  return (
    <div>
      <div className={`alert alert-${props.type}`} role="alert">
        {props.title}
      </div>
    </div>
  );
}

export default Alart;
