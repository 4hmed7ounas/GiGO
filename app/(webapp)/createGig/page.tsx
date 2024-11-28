"use client";

import { signOut } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FreelancerNavbar from "../../components/header/freelancernavbar";
import InputField from "../../components/input";
import { auth } from "../../firebase/config";

function MakeServicesContent() {
  const searchParams = useSearchParams(); // Get search params
  const userId = searchParams.get("userId"); // Retrieve userId from query parameters
  const username = searchParams.get("username"); // Retrieve username from query parameters

  const [title, setTitle] = useState("");
  const [keywords, setkeywords] = useState<string[]>([]);
  const [tier, setTier] = useState({
    price: "",
    deliveryTime: "",
  });
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [keyWordInput, setKeyWordInput] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleKeyWordInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyWord();
    }
  };

  const addKeyWord = () => {
    if (keywords.length >= 5) {
      setError("You can only add up to 5 keywords.");
      return;
    }
    const newKeyWord = keyWordInput.trim().replace(",", "");
    if (newKeyWord && !keywords.includes(newKeyWord)) {
      setkeywords([...keywords, newKeyWord]);
      setKeyWordInput("");
      setError("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setkeywords(keywords.filter((kw) => kw !== keyword));
  };

  const handleTierChange = (field: string, value: string) => {
    setTier({ ...tier, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = {
      title,
      keywords,
      tier: {
        price: parseFloat(tier.price),
        deliveryTime: parseInt(tier.deliveryTime),
      },
      description,
      imageURL,
      userId: userId || "", // Include userId in formData
      username: username || "", // Include username in formData
    };

    console.log(formData);

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        // Clear form on success
        setTitle("");
        setkeywords([]);
        setKeyWordInput("");
        setTier({ price: "", deliveryTime: "" });
        setDescription("");
        setImageURL("");
        router.push("/profile/freelancer")
      } else {
        throw new Error("Failed to create service");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the service.");
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
    <div className="w-full bg-primary-50 flex justify-center py-8 mt-14">
      <FreelancerNavbar onSignOut={handleSignOut} />
      <div className="w-[80%] lg:w-[40%] p-6 rounded-lg shadow-lg">
        <span>{username}</span>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="text-md text-gray-800 font-semibold"
            >
              Title
            </label>
            <InputField
              type="text"
              placeholder="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="text-md text-gray-800 font-semibold">
              Keywords
            </label>
            <input
              type="text"
              placeholder="Add a keyword and press Enter or Comma"
              value={keyWordInput}
              onChange={(e) => setKeyWordInput(e.target.value)}
              onKeyDown={handleKeyWordInput}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
            <div className="flex flex-wrap mt-2">
              {keywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex items-center bg-primary-500 text-white rounded-full px-3 py-1 mr-2 mb-2 text-sm"
                >
                  <span>{keyword}</span>
                  <button
                    type="button"
                    className="ml-2 text-white"
                    onClick={() => handleRemoveKeyword(keyword)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            {keywords.length === 5 && (
              <p className="text-green-500 text-sm">
                Maximum 5 keywords added.
              </p>
            )}
          </div>

          {/* Single Service Tier */}
          <div>
            <label className="text-md text-gray-800 font-semibold">
              Service Tier
            </label>
            <InputField
              type="number"
              placeholder="Price (PKR)"
              value={tier.price}
              onChange={(e) => handleTierChange("price", e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
            <InputField
              type="number"
              placeholder="Delivery Time (days)"
              value={tier.deliveryTime}
              onChange={(e) => handleTierChange("deliveryTime", e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-md text-gray-800 font-semibold">
              Description
            </label>
            <textarea
              placeholder="Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-md text-gray-800 font-semibold">
              Image URL
            </label>
            <InputField
              type="url"
              placeholder="Image URL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-primary-500 text-white rounded-lg py-2 font-semibold hover:bg-primary-600"
          >
            Create Gig
          </button>
        </form>
      </div>
    </div>
  );
}

export default function MakeServices() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MakeServicesContent />
    </Suspense>
  );
}
