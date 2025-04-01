import React from "react";

const InputField = ({ id, name, type, label, value, onChange, required }) => {
  return (
    <div className={`input-container ${value ? "has-content" : ""}`}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default InputField;
