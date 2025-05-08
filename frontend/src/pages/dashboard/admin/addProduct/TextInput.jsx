import React from "react";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="add-product-InputCSS"
      />
    </div>
  );
};

export default TextInput;
