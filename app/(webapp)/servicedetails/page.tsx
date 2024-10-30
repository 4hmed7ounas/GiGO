"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProfileReview from "./components/reviews";

interface Tier {
  price: number;
  deliveryTime: number;
}

interface Service {
  imageURL: string;
  profileImage: string;
  title: string;
  tier: Tier; // Include tier in the service structure
  description: string;
}

// Loading component to show while data is being fetched
const Loading = () => <div>Loading...</div>;

const ServiceDetails = () => {
  const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId"); // Use gigId from params
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (gigId) {
        try {
          // Fetch gig data from the API endpoint with gigId
          const response = await fetch(`/api/${gigId}`); // Ensure this is the correct API endpoint
          if (!response.ok) throw new Error("Failed to fetch service details");
          const data: Service = await response.json();
          setService(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchService();
  }, [gigId]);

  // If service is not loaded, show loading state
  if (!service) return <Loading />;

  return (
    <div className="container mx-auto p-10">
      <div className="container mx-auto py-5">
        <Image
          src={service.imageURL}
          alt={service.title}
          width={50}
          height={50}
          className="w-full h-auto"
        />
        <h1 className="text-3xl font-bold mt-5">{service.title}</h1>
        <Image
          src={service.profileImage}
          alt="Profile"
          width={50}
          height={50}
          className="w-16 h-16 rounded-full mt-2"
        />
        <p className="text-lg mt-2">Price: ${service.tier.price}</p>
        <p className="text-lg mt-2">Delivery Time: {service.tier.deliveryTime} days</p>
        <p className="text-black">Description: {service.description}</p>
      </div>
      <ProfileReview imageUrl="" name="Ahmed Younas" previousReviews={[]} />
    </div>
  );
};

// Wrap the component in a Suspense boundary
const ServiceDetailsWrapper = () => (
  <Suspense fallback={<Loading />}>
    <ServiceDetails />
  </Suspense>
);

export default ServiceDetailsWrapper;
