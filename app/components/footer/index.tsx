import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">GIGO</h2>
          <p className="mt-2">
            An advanced freelancing platform connecting clients with specialized freelancers.
          </p>
          <p className="mt-1">
            Email: <a href="mailto:info@gigo.com" className="underline">info@gigo.com</a>
          </p>
        </div>
        <div className="flex gap-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-50 transition-transform transform duration-1000 ease-in-out">
            <FaFacebook size={24} />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-50 transition-transform transform duration-1000 ease-in-out">
            <FaInstagram size={24} />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-50 transition-transform transform duration-1000 ease-in-out">
            <FaLinkedin size={24} />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-50 transition-transform transform duration-1000 ease-in-out">
            <FaTwitter size={24} />
          </a>
        </div>
      </div>
      <div className="text-center mt-4 border-t border-gray-700 pt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} GIGO. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
