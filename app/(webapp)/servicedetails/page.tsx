"use client";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import ProfileReview from "./components/reviews";
import ClientNavbar from "../../components/header/clientnavbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaClock, FaMoneyBill } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";
import { IMAGES } from "../../../share/assets";
import Button from "../../components/button";
import { auth, db } from "../../firebase/config";

interface Tier {
  price: number;
  deliveryTime: number;
}

interface Service {
  userId:string;
  imageURL: string;
  title: string;
  tier: Tier;
  description: string;
  username: string;
}

const Loading = () => (
  <div className="text-center text-lg">
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader color="#3498db" size={50} />
    </div>
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
  const [userName, setUserName] = useState<string | null>("Guest");

  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.uid) {
        try {
          const userDoc = doc(db, "users", user.uid); // Replace "users" with your collection name
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUserName(data.name || "Guest"); // Safely handle missing name
          }
        } catch (error) {
          console.error("Error fetching user name:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);
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
    if (service && user) {
      
      router.push(`/realTimeChat?gigId=${gigId}&userId=${user.uid}&freelancerId=${service.userId}`);
    } else {
      console.error("Service or user is not available");
    }
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
                src={IMAGES.profile}
                alt="Profile"
                width={50}
                height={50}
                className="w-16 h-16 rounded-full border-2 border-primary-600"
              />
              <p className="text-lg font-semibold ml-4">{service.username}</p>
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
        <ProfileReview
          imageUrl={IMAGES.profile.src}
          name={userName || ""}
          previousReviews={[]}
        />
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
