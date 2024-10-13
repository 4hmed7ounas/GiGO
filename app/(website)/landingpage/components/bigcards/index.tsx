import Image from "next/image";
import React from "react";

interface BigCardProps {
  title: string;
  image: string;
  link: string;
  backgroundColor: string; // Added backgroundColor prop
}

const BigCard: React.FC<BigCardProps> = ({ title, image, link, backgroundColor }) => {
  return (
    <a 
      href={link} 
      className="relative flex flex-col justify-between rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
      style={{ width: '220px', height: '300px' }} // Fixed width and height for the card
    >
      <div 
        className="absolute inset-0 rounded-lg"
        style={{ backgroundColor, zIndex: 0 }} // Background color is now behind the entire card
      />
      <div className="flex flex-col justify-between h-full relative z-10"> {/* Ensure title and image are above the background */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-center text-black mb-2">{title}</h3> {/* Title on top of card with bottom margin */}
        </div>
        <div className="flex justify-center flex-grow"> {/* Flex container for the image, allowing it to fill the remaining space */}
          <Image 
            src={image} 
            alt={title} 
            className="object-cover rounded-lg" // Changed to rounded-lg for 50% roundness
            style={{ width: '100%', height: '100%' }} // Image takes up the full height of the card
          />
        </div>
      </div>
    </a>
  );
};

export default BigCard;
