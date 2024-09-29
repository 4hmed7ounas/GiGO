"use client";
import React, { useState } from "react";
import InputField from "@/app/components/input";
import Button from "@/app/components/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log(res);
      sessionStorage.setItem("user", "true");
      router.push("../../profile/freelancer");
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Failed to log in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("../../profile/freelancer");
      console.log("Logged in with Google");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[80%] lg:w-[50%]">
        <h2 className="text-black font-bold text-3xl mb-3">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="flex flex-col" onSubmit={handleLogin}>
          <span className="text-md text-black">Email</span>
          <InputField
            type="email"
            placeholder="@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <div className="mt-2">
            <Button
              text="Login"
              type="submit"
              className="w-full bg-blue-500 p-1 hover:bg-blue-600 rounded-md text-white text-center"
            />
          </div>
          <div className="mt-2">
            <Button
              text="Login with"
              icon={<FaGoogle />}
              onClick={handleGoogleLogin}
              className="w-full bg-red-500 p-1 hover:bg-red-600 rounded-md text-white text-center"
            />
          </div>
          <div className="mt-4 text-black">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
