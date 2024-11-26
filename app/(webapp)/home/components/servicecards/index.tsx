import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ServiceCardProps {
  image: string;
  profileImage: string;
  title: string;
  price: string;
  gigId: string; // This is actually the gig _id
  username: string; // Add username prop
}

const truncateTitle = (title: string, maxLength: number) => {
  return title.length > maxLength
    ? `${title.substring(0, maxLength)}...`
    : title;
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  profileImage,
  title,
  price,
  gigId, 
  username, // Receive username prop
}) => {
  return (
    <div className="w-70 bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-0 pb-[56.25%]">
        <Image
          src={image}
          alt="Service"
          layout="fill"
          objectFit="cover"
          className="border-2 border-gray-200"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Profile Section */}
        <div className="flex items-center">
          <Image
            src={profileImage}
            alt="Profile"
            width={40}
            height={40}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <div className="ml-3">
            <h3 className="text-sm font-medium">{username}</h3> {/* Display username */}
            <p className="text-sm text-gray-600">{truncateTitle(title, 35)}</p>
            <p className="text-xs text-gray-500">Gig ID: {gigId}</p> {/* Display _id as Gig ID */}
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

export default ServiceCard;