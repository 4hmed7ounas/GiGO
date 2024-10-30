import Image from "next/image";
import React, { useState } from "react";

interface Review {
  rating: number;
  description: string;
}

interface ProfileProps {
  name: string;
  imageUrl: string;
  previousReviews: Review[];
}

const ProfileReview: React.FC<ProfileProps> = ({
  name,
  imageUrl,
  previousReviews,
}) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");

  const handleRatingChange = (value: number) => setRating(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ rating, description });
    setRating(0);
    setDescription("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <Image
          src={imageUrl}
          alt={name}
          width={60}
          height={60}
          className="rounded-full border-2 border-primary-500 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleRatingChange(index + 1)}
                className={`w-8 h-8 text-2xl mx-1 transition-transform duration-200 transform ${
                  rating > index ? "text-yellow-500" : "text-gray-300"
                } hover:scale-110`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your experience..."
            className="mt-4 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-primary-300 transition duration-150"
            rows={4}
            required
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700">Previous Reviews</h3>
        {previousReviews.length ? (
          previousReviews.map((review, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{ color: i < review.rating ? "#b59d00" : "#d1d5db" }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-700">{review.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileReview;
