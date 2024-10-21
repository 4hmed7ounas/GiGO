"use client";
import InputField from "@/app/components/input";
import Image from "next/image";
import { useState } from "react";

export default function MakeServices() {
  const [title, setTitle] = useState("");
  const [keyWords, setKeyWords] = useState<string[]>([]);
  const [tiers, setTiers] = useState([
    { price: "", deliveryTime: "", details: "" },
  ]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [keyWordInput, setKeyWordInput] = useState("");
  const [images, setImages] = useState<File[]>([]);

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

  const handleTierChange = (index: number, field: string, value: string) => {
    const updatedTiers = [...tiers];
    updatedTiers[index] = { ...updatedTiers[index], [field]: value };
    setTiers(updatedTiers);
  };

  const handleAddTier = () => {
    setTiers([...tiers, { price: "", deliveryTime: "", details: "" }]);
  };

  const handleRemoveTier = (index: number) => {
    const updatedTiers = [...tiers];
    updatedTiers.splice(index, 1);
    setTiers(updatedTiers);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFileSize = 500 * 1024; // 500KB in bytes
    if (files) {
      const validFiles: File[] = [];
      const invalidFiles: string[] = [];

      for (let i = 0; i < files.length; i++) {
        if (files[i].size <= maxFileSize) {
          validFiles.push(files[i]);
        } else {
          invalidFiles.push(files[i].name);
        }
      }

      if (invalidFiles.length > 0) {
        setError(
          `The following files exceed the 500KB limit: ${invalidFiles.join(
            ", "
          )}`
        );
      } else {
        setError("");
      }

      setImages([...images, ...validFiles]);
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
    setImages(images.filter((_, index) => index !== imageIndex));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");
    
    // Collect form data, saving image file names for MongoDB
    const formData = {
      title,
      keyWords,
      tiers,
      description,
      images: images.map(image => image.name), // Storing file names
    };
  
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
        setTiers([{ price: "", deliveryTime: "", details: "" }]);
        setDescription("");
        setImages([]);
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
    <label htmlFor="title" className="text-md text-gray-800 font-semibold">
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
    <label className="text-md text-gray-800 font-semibold">Keywords</label>
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
        <div key={index} className="flex items-center bg-primary-500 text-white rounded-full px-3 py-1 mr-2 mb-2 text-sm">
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
    {keyWords.length === 5 && <p className="text-green-500 text-sm">Maximum 5 keywords added.</p>}
  </div>

  {/* Service Tiers */}
  <div>
    <label className="text-md text-gray-800 font-semibold">Service Tiers</label>
    {tiers.map((tier, index) => (
      <div key={index} className="mb-4 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 font-semibold">Tier {index + 1}</span>
          {tiers.length > 1 && (
            <button
              type="button"
              className="text-red-500 text-sm"
              onClick={() => handleRemoveTier(index)}
            >
              Remove
            </button>
          )}
        </div>
        <InputField
          type="number"
          placeholder="Price ($)"
          value={tier.price}
          onChange={(e) => handleTierChange(index, "price", e.target.value)}
          required
          className="w-full p-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
        <InputField
          type="number"
          placeholder="Delivery Time (days)"
          value={tier.deliveryTime}
          onChange={(e) => handleTierChange(index, "deliveryTime", e.target.value)}
          required
          className="w-full p-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
        <textarea
          placeholder="Details"
          value={tier.details}
          onChange={(e) => handleTierChange(index, "details", e.target.value)}
          required
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
        />
      </div>
    ))}
    <button
      type="button"
      className="text-blue-500 text-sm mt-2"
      onClick={handleAddTier}
    >
      + Add Another Tier
    </button>
  </div>

  {/* Description */}
  <div>
    <label className="text-md text-gray-800 font-semibold">Description</label>
    <textarea
      placeholder="Describe your service"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
    />
  </div>

  {/* Image Upload */}
  <div>
    <label className="text-md text-gray-800 font-semibold">Upload Images</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
    <div className="flex flex-wrap mt-4">
      {images.map((image, index) => (
        <div key={index} className="relative mr-4 mb-4">
          <Image
            src={URL.createObjectURL(image)}
            alt={`uploaded-${index}`}
            width={80}
            height={80}
            className="object-cover rounded-lg"
          />
          <button
            type="button"
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
            onClick={() => handleRemoveImage(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
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
