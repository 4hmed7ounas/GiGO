"use client";
import React, { useState } from "react";
import InputField from "../../components/input";

export default function MakeServices() {
  const [title, setTitle] = useState("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [tier, setTier] = useState({
    price: "",
    deliveryTime: "",
  });
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [keyWordInput, setKeyWordInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleKeyWordInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addKeyWord();
    }
  };

  const addKeyWord = () => {
    if (keyWords.length >= 5) {
      setError("You can only add up to 5 keywords.");
      return;
    }
    const newKeyWord = keyWordInput.trim().replace(",", "");
    if (newKeyWord && !keyWords.includes(newKeyWord)) {
      setKeyWords([...keyWords, newKeyWord]);
      setKeyWordInput("");
      setError("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeyWords(keyWords.filter((kw) => kw !== keyword));
  };

  const handleTierChange = (field: string, value: string) => {
    setTier({ ...tier, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = {
      title,
      keyWords,
      tier,
      description,
      imageUrl,
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
        setKeyWords([]);
        setKeyWordInput("");
        setTier({ price: "", deliveryTime: "" });
        setDescription("");
        setImageUrl("");
      } else {
        throw new Error("Failed to create service");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the service.");
    }
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-[80%] lg:w-[40%] bg-white p-6 rounded-lg shadow-lg">
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
              {keyWords.map((keyword, index) => (
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
            {keyWords.length === 5 && (
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
              className="w-full p-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-md text-gray-800 font-semibold">
              Description
            </label>
            <textarea
              placeholder="Describe your service"
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
            <input
              type="text"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="self-end px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            Create Service
          </button>
        </form>
      </div>
    </div>
  );
}
