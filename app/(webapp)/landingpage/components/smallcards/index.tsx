import React from "react";

interface SmallCardProps {
  text: string;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  link?: string;
}

const SmallCard: React.FC<SmallCardProps> = (props) => {
  const { text, onClick, icon, link } = props;

  return (
    <div>
      <a
        href={link}
        className="w-36 h-36 bg-primary-50 rounded-lg shadow-lg flex flex-col justify-center items-center hover:scale-105 hover:shadow-xl hover:bg-primary-100 transition-transform duration-500 ease-in-out cursor-pointer"
        onClick={onClick}
      >
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="text-md font-semibold text-center">{text}</h3>
      </a>
    </div>
  );
};

export default SmallCard;
