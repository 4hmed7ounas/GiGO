"use client";
import React, { useState } from "react";
import InputField from "@/app/components/input";
import Button from "@/app/components/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(auth.app);

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      if (!userCredential) {
        throw new Error("User credential is undefined");
      }
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        username,
        phone,
        uid: user.uid,
        createdAt: new Date(),
      });
      console.log("User Credential:", userCredential);
      router.push("/options");
      sessionStorage.setItem("user", "true");
      resetForm();
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithGoogle();
      if (!userCredential) {
        throw new Error("User credential is undefined");
      }
      const user = userCredential.user;

      const nameParts = user.displayName ? user.displayName.split(" ") : [];
      const finalName =
        nameParts.length > 2
          ? nameParts.slice(0, 3).join(" ")
          : user.displayName;
      const finalUsername = finalName
        ? finalName.replace(/\s+/g, "") + "_" + user.uid
        : user.uid;

      await setDoc(doc(db, "users", user.uid), {
        name: finalName,
        email: user.email,
        username: finalUsername,
        uid: user.uid,
        createdAt: new Date(),
      });
      console.log("Google User Credential:", userCredential);
      router.push("/options");
      sessionStorage.setItem("user", "true");
    } catch (error) {
      setError("Failed to sign up with Google. Please try again.");
      console.error("Google Signup error:", error);
    }
  };

  const resetForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setName("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[80%] lg:w-[50%]">
        <h2 className="text-black font-bold text-3xl mb-3">
          Create New Account
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col" onSubmit={handleSignup}>
          <span className="text-md text-black">Name</span>
          <InputField
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Email</span>
          <InputField
            type="email"
            placeholder="@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Username</span>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Password</span>
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Confirm Password</span>
          <InputField
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Phone number</span>
          <InputField
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <div className="mt-2">
            <Button
              text="Signup"
              type="submit"
              className="w-full bg-green-500 p-1 hover:bg-green-600 rounded-md text-white text-center"
            />
          </div>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <Button
            text="Signup with"
            icon={<FaGoogle />}
            onClick={handleGoogleSignup}
            className="w-full bg-red-500 p-1 hover:bg-red-600 rounded-md text-white text-center"
          />
        </div>
        <div className="mt-4 text-black">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signin" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
