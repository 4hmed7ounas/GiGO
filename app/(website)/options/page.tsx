"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/button";
import Image from "next/image";
import { IMAGES } from "@/share/assets";
import { FaGear } from "react-icons/fa6";
import Link from "next/link";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(auth.app);

const Options: React.FC = () => {
  const router = useRouter();

  const handleUserRoleClick = async (role: "buyer" | "freelancer") => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};

      await setDoc(userDocRef, {
        ...existingData,
        role: role,
      });
      router.push(role === "buyer" ? "/profile/user" : "/profile/freelancer");
    } else {
      console.error("User is not authenticated.");
    }
  };

  return (
    <div className="bg-primary-50">
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
      <div className="bg-primary-50 w-full h-screen flex justify-center gap-5 items-center">
        <Button
          text="Become a Buyer"
          className="bg-secondary-100 text-black p-10 border-2 border-secondary-900 rounded-md text-xl hover:bg-secondary-200"
          onClick={() => handleUserRoleClick("buyer")}
        />
        <Button
          text="Become a Seller"
          className="bg-secondary-100 text-black p-10 border-2 border-secondary-900 rounded-md text-xl hover:bg-secondary-200"
          onClick={() => handleUserRoleClick("freelancer")}
        />
      </div>
    </div>
  );
};

export default Options;
