"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CiMenuBurger } from "react-icons/ci";
import Button from "../../components/button";
import ClientNavbar from "../../components/header/clientnavbar";
import ServiceCard from "../../components/servicecard";
import { auth } from "../../firebase/config";
import AdvanceFilters from "./components/advancefilters";

interface Service {
  _id: string; // Use _id instead of gigId
  imageURL: string;
  profileImage: string;
  title: string;
  tier: {
    price: number;
    deliveryTime: number;
  };
}

export default function Hero() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Failed to fetch services");
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

  const handleApplyFilters = async (filters: {
    skill: string;
    minPrice: number;
    maxPrice: number;
    deliveryTime: number;
    sellerDetails: string;
    reviews: number;
  }) => {
    try {
      const response = await fetch("/api/filteredData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filters),
      });
      if (!response.ok) throw new Error("Failed to fetch filtered services");
      const data: Service[] = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [user] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== "undefined") {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/");
    }
  }

  const handleSignOut = async () => {
    signOut(auth);
    sessionStorage.removeItem("user");
  };

  return (
    <div>
      <ClientNavbar onSignOut={handleSignOut} />
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
            {services.map((service) => (
              <Link
                href={{
                  pathname: "/servicedetails",
                  query: {
                    gigId: service._id, // Pass _id in query
                  },
                }}
                key={service._id}
              >
                <ServiceCard
                  image={service.imageURL}
                  profileImage={service.profileImage}
                  title={"I will do " + service.title}
                  price={service.tier.price.toString()}
                  gigId={service._id} // Pass _id as prop to ServiceCard
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <AdvanceFilters
        onClose={() => setIsPopupOpen(false)}
        onApplyFilters={handleApplyFilters}
        isOpen={isPopupOpen}
      />
    </div>
  );
}
