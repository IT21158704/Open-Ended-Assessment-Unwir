import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between">
          <div className="flex items-center">
            <a href="#" className="text-white font-semibold text-lg">
              Notice
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/IT21158704" className="text-white hover:text-gray-300">
              Github
            </a>
            <a href="https://www.nadundilshan.com" className="text-white hover:text-gray-300">
              Portfolio
            </a>
          </div>
          <div className="md:hidden">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6 text-white hover:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
