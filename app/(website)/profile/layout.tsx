"use client";
import FreelancerNavbar from "@/app/components/header/freelancernavbar";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
    <div className="flex bg-white">
      <div>
        <FreelancerNavbar onSignOut={handleSignOut} />
      </div>
      <div className="w-full md:w-1/2">{children}</div>
    </div>
  );
}
