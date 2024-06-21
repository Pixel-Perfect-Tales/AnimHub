import React from "react";

const Button = ({
  padx = "10px",
  pady = "10px",
  children,
  disabled,
  label,
  onClick,
  fontSize = "16px",
  color = "#000",
  primary = true,
}) => {
  const buttonStyle = {
    borderRadius: "4px",
  };

  return (
    <button
      className={`${primary ? "bg-[#FFA31A]" : "bg-[#007bff]"}
      px-[${padx}] py-[${pady}] text-[${color}] font-[600] text-[${fontSize}] max-sm:text-sm rounded-md tracking-wider  disabled:bg-[#2f2f2f] disabled:text-[#969696] mt-4 disabled:cursor-not-allowed`}
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label || children}
    </button>
  );
};

export default Button;
