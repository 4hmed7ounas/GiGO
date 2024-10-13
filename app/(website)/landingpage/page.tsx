"use client";

import Button from "@/app/components/button";
import Navbar from "@/app/components/header/navbar";
import InputField from "@/app/components/input";
import SmallCard from "./components/smallcards"; // Ensure the import matches the component name
import { useState } from "react";
import { IMAGES } from "@/share/assets"; // Importing images from assets
import { FaReact } from "react-icons/fa";
import { FaCode, FaPencilRuler, FaBullhorn, FaPenNib, FaFilm, FaRobot, FaMusic, FaBusinessTime, FaHandshake } from "react-icons/fa"; // Import all necessary icons

const cardData = [
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
    <div>
      <div
        className="h-screen flex items-center justify-center mt-36" // Added extra top margin
        style={{
          backgroundImage: `url(${IMAGES.landingImg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: '16 / 9',
          marginLeft: '60px',
          borderRadius: '15px', // Rounded corners
          height: '60vh', // Decreased height
          width: '90vw', // Decreased width
        }} // Use IMAGES for background with 16:9 ratio
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
      <div className="flex flex-col items-center mt-8"> {/* Added container for small cards */}
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-4"> {/* Flex container for cards */}
          {cardData.map((card, index) => (
            <SmallCard key={index} text={card.title} icon={card.icon} link={card.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
