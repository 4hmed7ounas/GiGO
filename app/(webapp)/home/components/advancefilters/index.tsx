import React, { useState } from "react";
import Button from "../../../../components/button";
import InputField from "../../../../components/input";

interface AdvanceFiltersProps {
  onClose: () => void;
  onApplyFilters: (filters: {
    skill: string;
    minPrice: number;
    maxPrice: number;
    deliveryTime: number;
    sellerDetails: string;
    reviews: number;
  }) => void;
  isOpen: boolean;
}

const AdvanceFilters: React.FC<AdvanceFiltersProps> = ({
  onClose,
  onApplyFilters,
  isOpen,
}) => {
  const [skill, setSkill] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [sellerDetails] = useState("");
  const [reviews, setReviews] = useState<number>(0);

  const handleApplyFilters = () => {
    onApplyFilters({
      skill,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      deliveryTime: Number(deliveryTime),
      sellerDetails,
      reviews,
    });
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-5 max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Skill</label>
            <InputField
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g: Web Development"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Min Price</label>
            <InputField
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g: 0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Max Price</label>
            <InputField
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g: 100000"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Delivery Time (days)
            </label>
            <InputField
              type="number"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="mt-1 p-2 w-full border rounded"
              placeholder="e.g: 5"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Reviews (0-5)</label>
            <input
              type="range"
              min="0"
              max="5"
              value={reviews}
              onChange={(e) => setReviews(Number(e.target.value))}
              className="mt-1 w-full"
            />
            <div className="text-center">
              {reviews} Star{reviews !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              text="Apply Filters"
              className="bg-secondary-500 text-white py-2 px-4 rounded"
              onClick={handleApplyFilters}
            />
            <Button
              text="Close"
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default AdvanceFilters;
