"use client";
import { useState } from "react";
import Button from "@/app/components/button";
import Navbar from "@/app/components/header/navbar";
import ServiceCard from "@/app/components/servicecard";
import { IMAGES } from "@/share/assets";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link"; // Import Link from Next.js if using Next.js

const services = [
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "M. Huzaifa",
    title: "assignments on dld dsd riscv arm verilog vhdl simulation",
    rating: 5.0,
    reviews: 2,
    price: "PKR 2,917",
  },
  {
    image: IMAGES.authImage.src,
    profileImage: IMAGES.gigo.src,
    name: "A. Khan",
    title: "expert in data analysis and visualization",
    rating: 4.8,
    reviews: 5,
    price: "PKR 3,500",
  },
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "S. Ali",
    title: "professional graphic designer for your needs",
    rating: 4.7,
    reviews: 3,
    price: "PKR 2,200",
  },
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "M. Huzaifa",
    title: "assignments on dld dsd riscv arm verilog vhdl simulation",
    rating: 5.0,
    reviews: 2,
    price: "PKR 2,917",
  },
  {
    image: IMAGES.authImage.src,
    profileImage: IMAGES.gigo.src,
    name: "A. Khan",
    title: "expert in data analysis and visualization",
    rating: 4.8,
    reviews: 5,
    price: "PKR 3,500",
  },
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "S. Ali",
    title: "professional graphic designer for your needs",
    rating: 4.7,
    reviews: 3,
    price: "PKR 2,200",
  },
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "M. Huzaifa",
    title: "assignments on dld dsd riscv arm verilog vhdl simulation",
    rating: 5.0,
    reviews: 2,
    price: "PKR 2,917",
  },
  {
    image: IMAGES.authImage.src,
    profileImage: IMAGES.gigo.src,
    name: "A. Khan",
    title: "expert in data analysis and visualization",
    rating: 4.8,
    reviews: 5,
    price: "PKR 3,500",
  },
  {
    image: IMAGES.gigo.src,
    profileImage: IMAGES.gigo.src,
    name: "S. Ali",
    title: "professional graphic designer for your needs",
    rating: 4.7,
    reviews: 3,
    price: "PKR 2,200",
  },
];

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
                {" "}
                {/* Use dynamic routing for service details */}
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
