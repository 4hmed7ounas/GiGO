import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: "blue" | "green" | "red" | "yellow";
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { text, onClick, color = "green", className = "" } = props;

  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
  };

  const buttonClasses = `
    ${colorClasses[color]}
    text-white
    font-bold
    py-2
    px-4
    rounded
    w-full
    cursor-pointer
    mb-2
    transition duration-300 ease-in-out
    ${className}
  `;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {text}
    </button>
  );
};

export default Button;
