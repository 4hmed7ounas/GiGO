"use client";
import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IMAGES } from "../../../share/assets";
import Image from "next/image";

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute -top-28 transform -translate-x-36 bg-primary-600 text-white text-base rounded-lg shadow-lg whitespace-nowrap w-[170px]">
      <div className="p-3 flex flex-col gap-2">{children}</div>
    </div>
  );
};

const Footer = () => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleMouseEnter = (platform: string) => {
    setShowTooltip(platform);
  };

  const handleMouseLeave = () => {
    setShowTooltip(null);
  };

  return (
    <footer className="bg-primary-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-bold">GIGO</h2>
          <p className="mt-2 text-gray-300">
            An advanced freelancing platform connecting clients with specialized
            freelancers.
          </p>
          <p className="mt-1">
            Email:{" "}
            <a
              href="mailto:info@gigo.com"
              className="underline text-primary-400 hover:text-primary-200"
            >
              info@gigo.com
            </a>
          </p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          {/* Facebook Icon */}
          <div
            onMouseEnter={() => handleMouseEnter("facebook")}
            onMouseLeave={handleMouseLeave}
            className="relative text-primary-400 hover:text-primary-200"
          >
            <FaFacebook size={28} />
            {showTooltip === "facebook" && (
              <Tooltip>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.ahmed}
                    alt="Ahmed Younas"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.facebook.com/4hmed7ounass/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ahmed Younas
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.hadeed}
                    alt="Hadeed Ahmed"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.facebook.com/hadeedahmed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hadeed Ahmed
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.zaid}
                    alt="Zaid Shabbir"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.facebook.com/zaid.sharazi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zaid Shabbir
                  </a>
                </div>
              </Tooltip>
            )}
          </div>

          {/* Instagram Icon */}
          <div
            onMouseEnter={() => handleMouseEnter("instagram")}
            onMouseLeave={handleMouseLeave}
            className="relative text-primary-400 hover:text-primary-200"
          >
            <FaInstagram size={28} />
            {showTooltip === "instagram" && (
              <Tooltip>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.ahmed}
                    alt="Ahmed Younas"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.instagram.com/4hmed7ounas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ahmed Younas
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.hadeed}
                    alt="Hadeed Ahmed"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.instagram.com/Hawdeeed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hadeed Ahmed
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.zaid}
                    alt="Zaid Shabbir"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.instagram.com/zaidshabbir1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zaid Shabbir
                  </a>
                </div>
              </Tooltip>
            )}
          </div>

          {/* LinkedIn Icon */}
          <div
            onMouseEnter={() => handleMouseEnter("linkedin")}
            onMouseLeave={handleMouseLeave}
            className="relative text-primary-400 hover:text-primary-200"
          >
            <FaLinkedin size={28} />
            {showTooltip === "linkedin" && (
              <Tooltip>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.ahmed}
                    alt="Ahmed Younas"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.linkedin.com/in/ahmed-younas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ahmed Younas
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.hadeed}
                    alt="Hadeed Ahmed"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.linkedin.com/in/hadeed-ahmed-27a97a268/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Hadeed Ahmed
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    src={IMAGES.zaid}
                    alt="Zaid Shabbir"
                    width={20}
                    height={20}
                    className="w-6 h-6 rounded-full"
                  />
                  <a
                    href="https://www.linkedin.com/in/zaid-shabbir-657746261/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zaid Shabbir
                  </a>
                </div>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} GIGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
