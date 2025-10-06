import React, { useState } from "react";

const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Helper function to generate input classes dynamically with the new theme
  const getInputClasses = (isTextArea = false) => {
    const baseClasses = `
      w-full p-4 rounded-xl bg-slate-800/50 text-white placeholder-transparent 
      focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 
      focus:ring-offset-slate-900 transition-all duration-300 peer
    `;

    const hoverFocusClasses = isFocused
      ? "shadow-[0_4px_12px_rgba(56,189,248,0.2)] border-cyan-500" // Cyan shadow and border
      : "border-white/10 hover:border-cyan-500/50";

    return `${baseClasses} ${hoverFocusClasses} ${isTextArea ? "h-52 pt-12" : "pl-12"}`;
  };

  // Render input or textarea based on the field type
  const renderInputContent = () => {
    if (field === "message") {
      return (
        <textarea
          id={field}
          name={field}
          placeholder={label}
          value={formData[field]}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={getInputClasses(true)}
          required
        />
      );
    }

    return (
      <input
        id={field}
        type={field === "email" ? "email" : "text"}
        name={field}
        placeholder={label}
        value={formData[field]}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={getInputClasses()}
        required
      />
    );
  };

  return (
    <div className="relative w-full group">
      {/* Icon and Label */}
      <div className={`absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors ${isFocused ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`}>
        <Icon className="w-5 h-5" />
      </div>
       <label
        htmlFor={field}
        className={`
          absolute left-12 top-4 text-gray-400 text-base transition-all duration-300 
          pointer-events-none
          peer-placeholder-shown:text-base 
          peer-placeholder-shown:top-4
          peer-focus:text-sm
          peer-focus:-top-5 
          peer-focus:left-0
          peer-focus:text-cyan-400
          ${formData[field] ? 'text-sm -top-5 left-0 text-cyan-400' : ''}
        `}
      >
        {label}
      </label>

      {/* Input or Textarea */}
      {renderInputContent()}

      {/* Focus/Hover Border Effect */}
      <div
        className={`
          absolute inset-0 border rounded-xl pointer-events-none 
          transition-all duration-300 
          ${isFocused ? "border-cyan-500" : "border-transparent"}
        `}
      ></div>
    </div>
  );
};

export default InputField;
