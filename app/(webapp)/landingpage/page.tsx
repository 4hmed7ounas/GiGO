"use client";
import React from "react";
import Button from "../../../app/components/button";
import Navbar from "../../../app/components/header/navbar";
import SmallCard from "./components/smallcards";
import BigCard from "./components/bigcards";
import { IMAGES } from "../../../share/assets";
import {
  FaCode,
  FaPencilRuler,
  FaBullhorn,
  FaPenNib,
  FaFilm,
  FaRobot,
  FaMusic,
  FaBusinessTime,
  FaHandshake,
} from "react-icons/fa"; // Importing the review component

const smallCardData = [
  {
    icon: <FaCode />,
    title: "Programming & Tech",
    link: "/services/programming",
  },
  {
    icon: <FaPencilRuler />,
    title: "Graphics & Design",
    link: "/services/graphics",
  },
  {
    icon: <FaBullhorn />,
    title: "Digital Marketing",
    link: "/services/marketing",
  },
  {
    icon: <FaPenNib />,
    title: "Writing & Translation",
    link: "/services/writing",
  },
  { icon: <FaFilm />, title: "Video & Animation", link: "/services/video" },
  { icon: <FaRobot />, title: "AI Services", link: "/services/ai" },
  { icon: <FaMusic />, title: "Music & Audio", link: "/services/music" },
  { icon: <FaBusinessTime />, title: "Business", link: "/services/business" },
  { icon: <FaHandshake />, title: "Consulting", link: "/services/consulting" },
];

const bigCardData = [
  {
    title: "Programming & Tech",
    image: IMAGES.bigcard1img.src,
    link: "/services/programming",
  },
  {
    title: "Graphics & Design",
    image: IMAGES.bigcard2img.src,
    link: "/services/graphics",
  },
  {
    title: "Digital Marketing",
    image: IMAGES.bigcard3img.src,
    link: "/services/marketing",
  },
  {
    title: "Writing & Translation",
    image: IMAGES.bigcard1img.src,
    link: "/services/writing",
  },
  {
    title: "Video & Animation",
    image: IMAGES.bigcard2img.src,
    link: "/services/video",
  },
  { title: "AI Services", image: IMAGES.bigcard3img.src, link: "/services/ai" },
  {
    title: "Music & Audio",
    image: IMAGES.bigcard1img.src,
    link: "/services/music",
  },
  {
    title: "Business",
    image: IMAGES.bigcard2img.src,
    link: "/services/business",
  },
  {
    title: "Consulting",
    image: IMAGES.bigcard3img.src,
    link: "/services/consulting",
  },
];

const getRandomLightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100;
  const g = Math.floor(Math.random() * 156) + 100;
  const b = Math.floor(Math.random() * 156) + 100;
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center mt-24 px-4 md:px-0"
        style={{
          backgroundImage: `url(${IMAGES.landingImg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          aspectRatio: "16 / 5",
          borderRadius: "15px",
          height: "60vh",
          width: "100%",
          maxWidth: "90vw",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-white p-4 md:p-0">
          <h1 className="text-2xl md:text-5xl font-bold mb-4 text-center">
            Find the right <span className="text-secondary-400">freelance</span>{" "}
            <br />
            service, right away
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8 w-full max-w-[90%]">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Our Services</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {smallCardData.map((card, index) => (
            <SmallCard
              key={index}
              text={card.title}
              icon={card.icon}
              link={card.link}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center mt-12 w-full max-w-[90%]">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Explore Our Services
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {bigCardData.map((card, index) => (
            <BigCard
              key={index}
              title={card.title}
              image={card.image}
              link={card.link}
              backgroundColor={getRandomLightColor()}
            />
          ))}
        </div>
      </div>
      <div className="bg-primary-950 w-full max-w-[90%] h-[200px] flex flex-col justify-center items-center my-10 rounded-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
          Freelance services at your fingertips!
        </h2>
        <Button
          text="Join GiGO."
          onClick={() => {
            "/auth/signup";
          }}
          className="bg-secondary-600 text-white py-2 px-6 mt-4 rounded-lg hover:bg-secondary-700 transition-colors duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};

export default LandingPage;
