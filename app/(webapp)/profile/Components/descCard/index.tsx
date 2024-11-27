import React from "react";

interface DescCardProps {
  description: string;
}

const DescCard: React.FC<DescCardProps> = ({ description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="p-5">
        <div className="flex flex-col gap-5 items-center">
            <h3 className="w-[100%] text-lg font-semibold text-gray-800">
                Description
            </h3>
          <p className="w-[100%] text-sm text-gray-700 text-justify">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DescCard;
