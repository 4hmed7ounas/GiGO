"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Button from "../../components/button";
import Navbar from "../../components/header/navbar";
import ServiceCard from "../../components/servicecard";
import ProfileReviewPage from "../landingpage/components/reviews";
interface Service {
  imageURL: string;
  profileImage: string;
  title: string;
  tier: {
    price: number;
    deliveryTime: number;
    details: string;
  };
}

interface PopupProps {
  onClose: () => void;
  onApplyFilters: (filters: { skill: string; minPrice: number; maxPrice: number; deliveryTime: number; sellerDetails: string; reviews: number }) => void;
}

const Popup: React.FC<PopupProps> = ({ onClose, onApplyFilters }) => {
  const [skill, setSkill] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [sellerDetails, setSellerDetails] = useState("");
  const [reviews, setReviews] = useState<number>(0); // State for reviews

  const handleApplyFilters = () => {
    onApplyFilters({ 
      skill, 
      minPrice: Number(minPrice), 
      maxPrice: Number(maxPrice), 
      deliveryTime: Number(deliveryTime), 
      sellerDetails,
      reviews // Include reviews in the filters
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Skill</label>
          <input
            type="text"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="e.g: Web Development"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="e.g: 0"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="e.g: 100000"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Delivery Time (days)</label>
          <input
            type="number"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="e.g: 5"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Seller Details</label>
          <input
            type="text"
            value={sellerDetails}
            onChange={(e) => setSellerDetails(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="e.g: Top Rated Seller"
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
          <div className="text-center">{reviews} Star{reviews !== 1 ? 's' : ''}</div>
        </div>

        <Button
          text="Apply Filters"
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={handleApplyFilters}
        />
        <Button
          text="Close"
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data: Service[] = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchServices();
  }, []);

  const handleFilter = () => {
    setIsPopupOpen(true);
  };

  const handleApplyFilters = async (filters: { skill: string; minPrice: number; maxPrice: number; deliveryTime: number; sellerDetails: string; reviews: number }) => {
    try {
      const response = await fetch('/api/filteredData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw new Error('Failed to fetch filtered services');
      const data: Service[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <div className="flex justify-start px-5 sm:px-10 md:px-20 py-7 flex-col gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">
            Result for:
          </h1>
          <Button
            text=""
            icon={<CiMenuBurger size={35} className="text-secondary-600" />}
            className="border-2 border-secondary-400 p-2 w-14 rounded-lg bg-secondary-300 hover:bg-secondary-400"
            onClick={handleFilter}
          />
        </div>
        <div className="px-5 sm:px-10 md:px-20 py-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
            {services.map((service, index) => (
              <Link href={`/services/${index}`} key={index}>
                <ServiceCard
                  image={service.imageURL}
                  profileImage={service.profileImage}
                  title={"I will do " + service.title}
                  price={service.tier.price.toString()}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} onApplyFilters={handleApplyFilters} />}
      <ProfileReviewPage name="Service Provider" imageUrl="/path/to/image.jpg" previousReviews={[]} /> {/* Example usage of the review component */}
    </div>
  );
}
