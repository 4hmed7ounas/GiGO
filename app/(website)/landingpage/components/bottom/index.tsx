import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { text, onClick, className = "", icon, type = "button" } = props;
  const buttonClasses = `
    cursor-pointer
    transition duration-300 ease-in-out
    ${className}
  `;

  return (
    <button onClick={onClick} className={buttonClasses} type={type}>
      <span className="flex items-center justify-center gap-2">{text}{icon}</span>
    </button>
  );
};

export default Button;
