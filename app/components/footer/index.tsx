import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-bold">GIGO</h2>
          <p className="mt-2 text-gray-300">
            An advanced freelancing platform connecting clients with specialized freelancers.
          </p>
          <p className="mt-1">
            Email: <a href="mailto:info@gigo.com" className="underline text-primary-400 hover:text-primary-200">info@gigo.com</a>
          </p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-200 transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-200 transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-200 transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-200 transition-colors duration-300 ease-in-out transform hover:scale-110"
          >
            <FaTwitter size={28} />
          </a>
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
