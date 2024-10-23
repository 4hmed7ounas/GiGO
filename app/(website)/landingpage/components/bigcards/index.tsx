import Image from "next/image";
import React from "react";

interface BigCardProps {
  title: string;
  image: string;
  link: string;
  backgroundColor: string;
}

const BigCard: React.FC<BigCardProps> = ({
  title,
  image,
  link,
  backgroundColor,
}) => {
  return (
    <a
      href={link}
      className="relative flex flex-col justify-between rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-500 ease-in-out"
      style={{ width: "220px", height: "300px" }}
    >
      <div
        className="absolute inset-0 rounded-lg"
        style={{ backgroundColor, zIndex: 0 }}
      />
      <div className="flex flex-col justify-between h-full relative z-10">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center text-black mb-2">
            {title}
          </h3>
        </div>
        <div className="flex justify-center flex-grow">
          <Image
            src={image}
            alt={title}
            className="object-cover rounded-lg"
            width={50}
            height={50}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </a>
  );
};

export default BigCard;
