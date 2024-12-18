import React from "react";

export default function TextInput({
  placeholder,
  label,
  className,
  value,
  setValue,
  labelClassName,
}) {
  // pass props as parameters
  return (
    <div
      className={`textInputDev space-y-2 w-full flex flex-col items-start ${className}`}
    >
      <label for={label} className={`font-semibold ${labelClassName}`}>
        {label}
      </label>

      <input
        className="w-full p-3 text-black placeholder-gray-600 border border-gray-600 border-solid rounded"
        type="text"
        placeholder={placeholder}
        id={label}
        value={value} // means that whatever prop 'value' we recieved while calling this component, set it to that comonents property 'value'
        onChange={(e) => {
          setValue(e.target.value);
        }} // means whever the value changes then set the value with updated value
      />
    </div>
  );
}
