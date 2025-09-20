import * as React from "react";

// Simple checkbox component without TypeScript
const Checkbox = ({ className, checked, onCheckedChange, id, ...props }) => {
  const handleChange = (e) => {
    if (onCheckedChange) {
      onCheckedChange(e.target.checked);
    }
  };

  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={handleChange}
      className={`h-4 w-4 rounded border border-gray-300 ${className || ''}`}
      {...props}
    />
  );
};

export { Checkbox };
