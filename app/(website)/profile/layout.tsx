"use client";
import FreelancerNavbar from "@/app/components/header/freelancernavbar";
import ClientNavbar from "@/app/components/header/clientnavbar"; // Import ClientNavbar
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(auth.app);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user] = useAuthState(auth);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUserRole = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setRole(userData.role);
        }
      }
    };

    checkUserRole();
  }, [user]);

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
    <div className="flex bg-white">
      <div>
        {role === "buyer" ? (
          <ClientNavbar onSignOut={handleSignOut} />
        ) : (
          <FreelancerNavbar onSignOut={handleSignOut} />
        )}
      </div>
      <div className="w-full md:w-1/2">{children}</div>
    </div>
  );
}
