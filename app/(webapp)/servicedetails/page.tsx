"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import ProfileReview from "./components/reviews";
import Image from "next/image";

const ServiceDetails = () => {
  const searchParams = useSearchParams();

  const imageURL = searchParams.get("imageURL");
  const profileImage = searchParams.get("profileImage");
  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const deliveryTime = searchParams.get("deliveryTime");
  const details = searchParams.get("details");

  return (
    <div className="container mx-auto p-10">
      <div className="container mx-auto py-5">
        <Image
          src={imageURL ?? ""}
          alt={title ?? ""}
          width={50}
          height={50}
          className="w-full h-auto"
        />
        <h1 className="text-3xl font-bold mt-5">{title}</h1>
        <Image
          src={profileImage ?? ""}
          alt="Profile"
          width={50}
          height={50}
          className="w-16 h-16 rounded-full mt-2"
        />
        <p className="text-lg mt-4">Details: {details}</p>
        <p className="text-lg mt-2">Price: ${price}</p>
        <p className="text-lg mt-2">Delivery Time: {deliveryTime} days</p>
      </div>
      <ProfileReview imageUrl="" name="Ahmed Younas" previousReviews={[]} />
    </div>
  );
};

export default ServiceDetails;
