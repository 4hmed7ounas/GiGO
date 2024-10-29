import React, { useState } from 'react';

interface Review {
  rating: number;
  description: string;
}

interface ProfileProps {
  name: string;
  imageUrl: string; // URL of the user's image
  previousReviews: Review[];
}

const ProfileReviewPage: React.FC<ProfileProps> = ({ name, imageUrl, previousReviews }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const handleRatingChange = (value: number) => setRating(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ rating, description });
    setRating(0);
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full object-cover" />
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleRatingChange(index + 1)}
                className="w-8 h-8"
                style={{ color: rating > index ? 'gold' : '#d1d5db' }}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your experience..."
            className="mt-4 p-3 w-full border rounded-lg"
            rows={4}
            required
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Submit Review
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Previous Reviews</h3>
        {previousReviews.length ? (
          previousReviews.map((review, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < review.rating ? '#b59d00' : '#d1d5db' }}>
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

export default ProfileReviewPage;
