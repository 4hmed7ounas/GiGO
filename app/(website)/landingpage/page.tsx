"use client";

import Button from "@/app/components/button";
import Navbar from "@/app/components/header/navbar";
import InputField from "@/app/components/input";
import SmallCard from "./components/smallcards"; // Ensure the import matches the component name
import BigCard from "./components/bigcards"; // Ensure you import BigCard
import { useState } from "react";
import { IMAGES } from "@/share/assets"; // Importing images from assets
import { FaCode, FaPencilRuler, FaBullhorn, FaPenNib, FaFilm, FaRobot, FaMusic, FaBusinessTime, FaHandshake } from "react-icons/fa"; // Import all necessary icons

// Data for small cards
const smallCardData = [
  { icon: <FaCode />, title: "Programming & Tech", link: "/services/programming" },
  { icon: <FaPencilRuler />, title: "Graphics & Design", link: "/services/graphics" },
  { icon: <FaBullhorn />, title: "Digital Marketing", link: "/services/marketing" },
  { icon: <FaPenNib />, title: "Writing & Translation", link: "/services/writing" },
  { icon: <FaFilm />, title: "Video & Animation", link: "/services/video" },
  { icon: <FaRobot />, title: "AI Services", link: "/services/ai" },
  { icon: <FaMusic />, title: "Music & Audio", link: "/services/music" },
  { icon: <FaBusinessTime />, title: "Business", link: "/services/business" },
  { icon: <FaHandshake />, title: "Consulting", link: "/services/consulting" },
];

// Data for big cards
const bigCardData = [
  { title: "Programming & Tech", image: IMAGES.bigcard1img.src, link: "/services/programming" },
  { title: "Graphics & Design", image: IMAGES.bigcard2img.src, link: "/services/graphics" },
  { title: "Digital Marketing", image: IMAGES.bigcard3img.src, link: "/services/marketing" },
  { title: "Writing & Translation", image: IMAGES.bigcard1img.src, link: "/services/writing" },
  { title: "Video & Animation", image: IMAGES.bigcard2img.src, link: "/services/video" },
  { title: "AI Services", image: IMAGES.bigcard3img.src, link: "/services/ai" },
  { title: "Music & Audio", image: IMAGES.bigcard1img.src, link: "/services/music" },
  { title: "Business", image: IMAGES.bigcard2img.src, link: "/services/business" },
  { title: "Consulting", image: IMAGES.bigcard3img.src, link: "/services/consulting" },
];

// Function to generate random light colors
const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Ensure lighter colors
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgba(${r}, ${g}, ${b}, 0.8)`; // Use rgba for transparency
};

const LandingPage: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() === "") {
      alert("Please enter a search term."); // Alert if search is empty
      return;
    }
    // Implement search functionality here
    console.log("Searching for:", search);
    setSearch("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <div
        className="flex-grow flex items-center justify-center mt-36"
        style={{
          backgroundImage: `url(${IMAGES.landingImg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: '16 / 9',
          marginLeft: '60px',
          borderRadius: '15px',
          height: '60vh',
          width: '90vw',
        }}
      >
        <Navbar />
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Find the right <span className="text-green-400">freelance</span> service, right away
          </h1>
          <div className="flex w-[50%] justify-center mt-8">
            <InputField
              type="text"
              placeholder="Search for any service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[80%] p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-transparent text-black placeholder:text-sm"
            />
            <Button
              text="Search"
              onClick={handleSearch}
              className="bg-secondary-600 text-white py-2 px-4 w-[20%] rounded-r-lg hover:bg-secondary-700 transition-colors duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>

      {/* Small Cards Section */}
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {smallCardData.map((card, index) => (
            <SmallCard key={index} text={card.title} icon={card.icon} link={card.link} />
          ))}
        </div>
      </div>

      {/* Big Cards Section */}
      <div className="flex flex-col items-center mt-12">
        <h1 className="text-4xl font-bold mb-4">Explore Our Services</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {bigCardData.map((card, index) => (
            <BigCard 
              key={index} 
              title={card.title} 
              image={card.image} 
              link={card.link} 
              backgroundColor={getRandomLightColor()} // Pass random light color as prop
            />
          ))}
        </div>
      </div>

      {/* New Customizable Rectangle Section */}
      <div className="bg-red-950 w-[70%] h-[200px] flex flex-col justify-center items-center mt-10 ml-[190px] rounded-lg">
        <h2 className="text-3xl font-bold text-center text-white">Freelance services at your fingertips!</h2>
        <Button
          text="Join GiGO"
          onClick={() => { /* Add your button action here */ }}
          className="bg-green-600 text-white py-2 px-6 mt-4 rounded-lg hover:bg-green-700 transition-colors duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default LandingPage;
