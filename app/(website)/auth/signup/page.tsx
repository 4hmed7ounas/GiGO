"use client";
import React, { useState } from "react";
import InputField from "@/app/components/input";
import Button from "@/app/components/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import { auth } from "../../../firebase/config";
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log(res);
      router.push('../../profile/user');
      sessionStorage.setItem("user", "true");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
    } catch (error) {
      setError("Failed to sign up. Please try again.");
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Signing up with Google");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[80%] lg:w-[50%]">
        <h2 className="text-black font-bold text-3xl mb-3">
          Create New Account
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col" onSubmit={handleSignup}>
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
          <div className="mt-2">
            <Button
              text="Signup with"
              icon={<FaGoogle />}
              onClick={handleGoogleSignup}
              className="w-full bg-red-500 p-1 hover:bg-red-600 rounded-md text-white text-center"
            />
          </div>
          <div className="mt-4 text-black">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
