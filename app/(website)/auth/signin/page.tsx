"use client";
import Button from "@/app/components/button";
import InputField from "@/app/components/input";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../../../firebase/config";

const db = getFirestore(auth.app);

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (!res) {
        throw new Error("Response is undefined.");
      }
      if (!res.user) {
        throw new Error("User does not exist.");
      }
      console.log(res);
      sessionStorage.setItem("user", "true");
      const userDocRef = doc(db, "users", res.user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "buyer") {
          router.push("/profile/user");
        } else if (userData.role === "freelancer") {
          router.push("/profile/freelancer");
        } else {
          throw new Error("User role is not recognized.");
        }
      } else {
        throw new Error("User document does not exist.");
      }

      setEmail("");
      setPassword("");
    } catch (e) {
      setError(
        "Failed to log in. Please check your credentials or if the user exists."
      );
      console.error("Login error:", e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithGoogle();
      if (!userCredential) {
        throw new Error("User credential is undefined");
      }
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("Existing user:", userData);
        if (userData.role === "buyer") {
          router.push("/profile/user");
        } else if (userData.role === "freelancer") {
          router.push("/profile/freelancer");
        } else {
          throw new Error("User role is not recognized.");
        }
      } else {
        const nameParts = user.displayName ? user.displayName.split(" ") : [];
        const finalName =
          nameParts.length > 2
            ? nameParts.slice(0, 3).join(" ")
            : user.displayName;
        const finalUsername = finalName
          ? finalName.replace(/\s+/g, "") + "_" + user.uid.slice(0, 8)
          : user.uid;

        await setDoc(doc(db, "users", user.uid), {
          name: finalName,
          email: user.email,
          username: finalUsername,
          uid: user.uid,
          createdAt: new Date(),
          role: "buyer",
        });

        console.log("New user created in Firestore:", user);
        router.push("/profile/user");
      }

      sessionStorage.setItem("user", "true");
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
      console.error("Google Signup error:", error);
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
            className="w-full p-1 mb-2 rounded border border-primary-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <span className="text-md text-black">Password</span>
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
            className="w-full p-1 mb-2 rounded border border-primary-800 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-transparent text-black placeholder:text-sm"
          />
          <div className="mt-2">
            <Button
              text="Login"
              type="submit"
              className="w-full bg-primary-500 p-1 hover:bg-primary-600 rounded-md text-white text-center"
            />
          </div>
          <div className="mt-2">
            <Button
              text="Login with"
              icon={<FaGoogle />}
              onClick={handleGoogleLogin}
              className="w-full bg-[#DB4437] p-1 hover:bg-[#b62b1f] rounded-md text-white text-center"
            />
          </div>
          <div className="mt-4 text-black">
            <p>
              Already have an account?{" "}
              <Link href="/auth/signup" className="text-primary-500">
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
