"use client";
import React, { useEffect, useState } from 'react';

interface Pricing {
  price: number;
  deliveryTime: string;
  revisions: number;
  wordsLimit: number;
}

interface Seller {
  profileImage: string;
  name: string;
  rating: number;
  reviews: number;
  country: string;
  responseTime: string;
  lastDelivery: string;
  bio: string;
}

interface GigData {
  title: string;
  pricing: Pricing;
  image: string;
  description: string;
  topics: string[];
  software: string[];
  serviceType: string;
  language: string;
  deliveryPreference: string;
  academicNote: string;
  seller: Seller;
}

const Page: React.FC = () => {
  const [gigData, setGigData] = useState<GigData | null>(null);

  useEffect(() => {
    const fetchGigData = async () => {
      const response = await fetch('/api/gig'); // Example API endpoint
      const data: GigData = await response.json();
      setGigData(data);
    };

    fetchGigData();
  }, []);

  if (!gigData) {
    return <div>Loading...</div>; // Loading state while fetching data
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{gigData.title}</h1>
        <div className="text-right">
          <div className="font-semibold text-lg">PKR {gigData.pricing.price}</div>
          <div>{gigData.pricing.deliveryTime} delivery</div>
          <div>{gigData.pricing.revisions} revisions</div>
          <div>{gigData.pricing.wordsLimit} words limit</div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Contact me</button>
        </div>
      </header>

      <section className="mb-8">
        <img src={gigData.image} alt="Gig Example" className="w-full h-64 object-cover rounded-md" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold">About this gig</h2>
        <p className="mt-2">{gigData.description}</p>
        <h3 className="mt-4 font-semibold">Related skills:</h3>
        <ul className="list-disc list-inside">
          {gigData.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="font-semibold">Software:</h3>
        <ul className="list-disc list-inside">
          {gigData.software.map((software, index) => (
            <li key={index}>{software}</li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="font-semibold">Service type:</h3>
        <p>{gigData.serviceType}</p>
        <h3 className="font-semibold mt-4">Language:</h3>
        <p>{gigData.language}</p>
      </section>

      <section className="mb-8 bg-yellow-100 p-4 rounded-lg">
        <h3 className="font-semibold">Delivery style preference:</h3>
        <p>{gigData.deliveryPreference}</p>
      </section>

      <section className="mb-8 bg-red-100 p-4 rounded-lg">
        <h3 className="font-semibold">Academic work note:</h3>
        <p>{gigData.academicNote}</p>
      </section>

      <footer className="mt-8 p-4 bg-gray-200 rounded-lg flex items-center">
        <img
          src={gigData.seller.profileImage}
          alt={`${gigData.seller.name}'s profile`}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold">{gigData.seller.name}</h3>
          <div className="text-sm text-gray-700">Rating: {gigData.seller.rating} ({gigData.seller.reviews} reviews)</div>
          <div className="text-sm text-gray-700">{gigData.seller.country}</div>
          <div className="text-sm text-gray-700">Avg. response time: {gigData.seller.responseTime}</div>
          <div className="text-sm text-gray-700">Last delivery: {gigData.seller.lastDelivery}</div>
          <p className="mt-2">{gigData.seller.bio}</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
