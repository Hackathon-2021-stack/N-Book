import React from "react";

export default function Alert(props) {
  const { salart } = props;
  const cap = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div style={{ height: "60px" }}>
      {props.alert && (
        <div
          className={`alert alert-${salart.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{cap(salart.Type)}</strong>
          {salart.Message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  );
}
