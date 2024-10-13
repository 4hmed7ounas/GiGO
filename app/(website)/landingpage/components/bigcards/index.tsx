import React from "react";

interface BigCardProps {
  title: string;
  image: string;
  bgColor: string;
}

const BigCard: React.FC<BigCardProps> = ({ title, image, bgColor }) => {
  return (
    <div className={`w-60 h-80 rounded-xl shadow-lg flex flex-col justify-between p-4 ${bgColor} text-white`}>
      <div className="text-xl font-bold">{title}</div>
      <div className="h-40 flex items-center justify-center">
        <img src={image} alt={title} className="object-contain w-full h-full rounded-lg" />
      </div>
    </div>
  );
};

const BigCardsGrid = () => {
  const services = [
    {
      title: "Website Development",
      image: "https://via.placeholder.com/150", // Replace with your image
      bgColor: "bg-green-600",
    },
    {
      title: "Logo Design",
      image: "https://via.placeholder.com/150", // Replace with your image
      bgColor: "bg-orange-500",
    },
    {
      title: "SEO",
      image: "https://via.placeholder.com/150", // Replace with your image
      bgColor: "bg-green-800",
    },
    {
      title: "Architecture & Interior Design",
      image: "https://via.placeholder.com/150", // Replace with your image
      bgColor: "bg-rose-700",
    },
    // Add more cards here
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-start">
      {services.map((service, index) => (
        <BigCard key={index} title={service.title} image={service.image} bgColor={service.bgColor} />
      ))}
    </div>
  );
};

const PopularBigCards = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Popular Services</h1>
      <BigCardsGrid />
    </div>
  );
};

export default PopularBigCards;
