import React from 'react';

const Header2 = () => {
    return (
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold ml-10 text-gray-800">GIGO.</h1> {/* Added left margin to GiGO */}
  
          <div className="relative flex-grow ml-24"> {/* Removed margin to eliminate space between search bar and button */}
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 w-3/4" 
            />
            <button className="absolute  right-0 top-0 h-full px-2 border-l border-gray-300 rounded-r-lg bg-gray-200 hover:bg-gray-300 focus:outline-none text-gray-800">
              Search
            </button>
          </div>
          <div className="space-x-4 my-4"> {/* Added margin to create space between search bar and links */}
            <a href="#" className="hover:underline text-gray-800">
              Become a Seller
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Become a Buyer
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Signup
            </a>
            <a href="#" className="hover:underline text-gray-800">
              Login
            </a>
          </div>
        </div>
      </header>
    );
};

export default Header2;