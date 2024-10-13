import React from "react";

interface SmallCardProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  link?: string; // Added 'link' property
}

const SmallCard: React.FC<SmallCardProps> = (props) => {
  const { text, onClick, className = "", icon, link } = props;
  
  const buttonClasses = `
    cursor-pointer
    transition duration-300 ease-in-out
    ${className}
  `;

  return (
    <div>
      <a
        href={link} // Using the 'link' property here
        className="w-36 h-36 bg-primary-50 rounded-lg shadow-lg flex flex-col justify-center items-center hover:shadow-xl hover:bg-primary-100 transition-shadow duration-200 ease-in-out cursor-pointer"
        onClick={onClick} // Added onClick to handle click events
      >
        <div className="text-3xl mb-2">{icon}</div> {/* Icon */}
        <h3 className="text-md font-semibold text-center">{text}</h3> {/* Updated to use 'text' prop */}
      </a>
    </div>
  );
};

export default SmallCard;
