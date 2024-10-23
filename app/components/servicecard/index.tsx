import Image from "next/image";
import { FaStar } from "react-icons/fa";
import React from "react";

interface ServiceCardProps {
  image: string;
  profileImage: string;
  name: string;
  title: string;
  rating?: number; // Optional rating
  reviews?: number; // Optional reviews count
  price: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  profileImage,
  name,
  title,
  rating,
  reviews,
  price,
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
            className="rounded-full border-2 border-gray-200"
          />
          <div className="ml-3">
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="text-sm text-gray-600">{title}</p>
          </div>
        </div>

        <div className="mt-3 flex w-full items-center">
          {rating !== undefined && rating !== null && (
            <div className="flex items-center text-yellow-400">
              <FaStar />
              <span className="ml-1 text-sm font-semibold text-black">
                {rating.toFixed(1)}
              </span>
              {reviews !== undefined && (
                <span className="ml-1 text-gray-500">({reviews})</span>
              )}
            </div>
          )}
          <div className="ml-auto text-sm font-semibold text-black">
            From {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
