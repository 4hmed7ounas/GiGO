import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface GigCardProps {
  image: string;
  title: string;
  price: string;
  gigId: string;
}

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};

const GigCard: React.FC<GigCardProps> = ({
  image,
  title,
  price,
  gigId, 
}) => {
  return (
    <div className="w-70 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full h-0 pb-[56.25%]">
        <Image
          src={image}
          alt="Service"
          layout="fill"
          objectFit="cover"
          className="border-2 border-gray-200"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-sm text-gray-600">{truncateTitle(title, 35)}</p>
            <p className="text-xs text-gray-500">Gig ID: {gigId}</p>
          </div>
        </div>

        <div className="mt-3 flex w-full items-center">
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-sm font-semibold text-black">5</span>
            <span className="ml-1 text-gray-500">(3)</span>
          </div>
          <div className="ml-auto text-sm font-semibold text-black">
            From {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigCard;