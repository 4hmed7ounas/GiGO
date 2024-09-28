import React from 'react';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa'; // Ensure react-icons is installed

const Header1: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b-2 shadow-md bg-white">
      {/* Left side - Logo */}
      <div className="text-2xl font-bold text-gray-800 ml-10"> {/* Added margin left to GiGO */}
        <span>GiGO.</span>
      </div>

      {/* Middle - Navigation Links */}
      <nav className="space-x-8 flex-grow ml-4" > {/* Added margin between GiGO and Links */}
        <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Dashboard</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Listings</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Orders</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-200">Earnings</a>
      </nav>

      {/* Right side - User Icons */}
      <div className="flex space-x-4 items-center">
        <FaBell className="text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200" size={20} />
        <FaEnvelope className="text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200" size={20} />
        <FaUserCircle className="text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200" size={24} />
      </div>
    </header>
  );
};



///
export default Header1;