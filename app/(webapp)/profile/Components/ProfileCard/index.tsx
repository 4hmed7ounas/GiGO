import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";

interface ProfileCardProps {
  profileImage: string;
  name: string;
  username: string;
  bio: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileImage,
  name,
  username,
  bio,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-10">
        <div className="flex flex-col gap-5 items-center">
          <Image
            src={profileImage}
            alt="Profile"
            width={400}
            height={400}
            className="w-60 h-60 rounded-full border-2 border-gray-600"
          />
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{name}</p>
            <h3 className="text-lg">{username}</h3>
            <p className="text-base text-gray-500">{bio}</p>
            <div className="mt-3 flex items-center text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <span className="ml-1 text-sm font-semibold text-black">5</span>
              <span className="ml-1 text-gray-500">(3)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
