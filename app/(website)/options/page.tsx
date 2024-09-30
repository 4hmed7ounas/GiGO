"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/button";
import Image from "next/image";
import { IMAGES } from "@/share/assets";
import { FaGear } from "react-icons/fa6";
import Link from "next/link";

const Options: React.FC = () => {
  const router = useRouter();

  const handleBuyerClick = () => {
    router.push("/profile/user");
  };

  const handleSellerClick = () => {
    router.push("/profile/freelancer");
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-900 flex justify-center fixed top-0 right-0 left-0">
        <div className="h-20 w-[90%] flex items-center justify-between">
          <Image alt="GiGO." src={IMAGES.gigo} className="h-8 w-auto" />
          <Link href="/about" className="flex items-center">
            <FaGear
              size={30}
              className="text-white hover:text-gray-200 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="bg-white w-full h-screen flex justify-center gap-5 items-center">
        <Button
          text="Become a Buyer"
          className="bg-slate-200 text-black p-10 border-2 border-gray-900 rounded-md text-xl hover:bg-slate-300"
          onClick={handleBuyerClick}
        />
        <Button
          text="Become a Seller"
          className="bg-slate-200 text-black p-10 border-2 border-gray-900 rounded-md text-xl hover:bg-slate-300"
          onClick={handleSellerClick}
        />
      </div>
    </div>
  );
};

export default Options;
