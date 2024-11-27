import React from "react";
import { IconType } from "react-icons/lib";

interface CreateGigCardProps {
  title: string;
  icon: IconType;
}

const CreateGigCard: React.FC<CreateGigCardProps> = ({ title, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="p-10">
        <div className="flex flex-col gap-5 items-center">
          <Icon className="text-5xl text-primary-600" />
          <h3 className="w-[100%] text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default CreateGigCard;
