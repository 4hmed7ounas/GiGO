"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProfileReview from "./components/reviews";
import LoadingSpinner from "../../components/LoadingSpinner";
import ClientNavbar from "../../components/header/clientnavbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { FaClock, FaMoneyBill } from "react-icons/fa";
import Button from "../../components/button";

interface Tier {
  price: number;
  deliveryTime: number;
}

interface Service {
  imageURL: string;
  profileImage: string;
  title: string;
  tier: Tier;
  description: string;
}

const Loading = () => (
  <div className="text-center text-lg">
    <LoadingSpinner />
  </div>
);

const ServiceDetails = () => {
  const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId");
  const [service, setService] = useState<Service | null>(null);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const fetchService = async () => {
      if (gigId) {
        try {
          const response = await fetch(`/api/${gigId}`);
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = sessionStorage.getItem("user");
      if (!user && !userSession) {
        router.push("/");
      }
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    sessionStorage.removeItem("user");
  };

  const handleContactME = async () => {
    router.push(`/realTimeChat?gigId=${gigId}`);
  };

  if (!service) return <Loading />;

  return (
    <div>
      <ClientNavbar onSignOut={handleSignOut} />
      <div className="container max-w-[85%] mx-auto my-20">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="w-full md:w-[58%] bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mt-5">
              I will do {service.title}
            </h1>
            <div className="flex items-center my-3">
              <Image
                src={service.profileImage}
                alt="Profile"
                width={50}
                height={50}
                className="w-16 h-16 rounded-full border-2 border-primary-600"
              />
              <p className="text-lg font-semibold ml-4">Ahmed Younas</p>
            </div>
            <div className="flex items-center mt-4">
              <Image
                src={service.imageURL}
                alt={service.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="w-full md:w-[40%] h-[25vh] bg-white p-6 rounded-lg shadow-lg items-center">
            <div className="mt-4 flex flex-col gap-5">
              <div className="flex justify-between flex-wrap">
                <div className="flex items-center">
                  <FaMoneyBill className="text-xl" />
                  <p className="ml-2 text-lg">
                    <span className="font-semibold">Price: </span>
                    PKR {service.tier.price}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-xl" />
                  <p className="ml-2 text-lg">
                    <span className="font-semibold">Delivery Time:</span>{" "}
                    {service.tier.deliveryTime} days
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  text="Contact me"
                  onClick={handleContactME}
                  className="w-[70%] bg-primary-900 p-2 hover:bg-primary-600 rounded-md text-white text-center transition-colors duration-300"
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-black mt-6 text-lg leading-relaxed">
          <span className="text-3xl font-semibold">Description:</span>
          <br />
          <span>{service.description}</span>
        </p>
      </div>
      <div className="my-6">
        <ProfileReview imageUrl="" name="Ahmed Younas" previousReviews={[]} />
      </div>
    </div>
  );
};

const ServiceDetailsWrapper = () => (
  <Suspense fallback={<Loading />}>
    <ServiceDetails />
  </Suspense>
);

export default ServiceDetailsWrapper;
