"use client";
import Navbar from "../../components/header/navbar";
import ServiceCard from "../../components/servicecard";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Button from "../../components/button";

interface Service {
  image: string;
  profileImage: string;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
}

interface PopupProps {
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
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
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
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

  const handleClosePopup = () => {
    setIsPopupOpen(false);
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
        <div className="flex justify-center items-center py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[90%] mx-auto">
            {services.map((service, index) => (
              <Link href={`/services/${index}`} key={index}>
                <ServiceCard
                  image={service.image}
                  profileImage={service.profileImage}
                  name={service.name}
                  title={"I will do " + service.title}
                  rating={service.rating}
                  reviews={service.reviews}
                  price={service.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {isPopupOpen && <Popup onClose={handleClosePopup} />}
    </div>
  );
}
