import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-20 px-6 flex justify-between items-center z-50 animate-slide-down">
      <div className="flex items-center gap-3 h-full">
        {/* Use the app's public logo as the navbar brand. Replace Short.png in /public with ETA logo when available. */}
        <img src={`${process.env.PUBLIC_URL}/Short.png`} alt="ETA logo" className="h-12 w-auto" />
        <span className="sr-only">ETA Learning</span>
      </div>

      <div className="flex items-center gap-4 h-full">
        <a href="#home" className="text-mainPink hover:text-mainBlue flex items-center h-full px-2">Home</a>
        <a href="#programs" className="text-mainPink hover:text-mainBlue flex items-center h-full px-2">Programs</a>
        <a href="#faq" className="text-mainPink hover:text-mainBlue flex items-center h-full px-2">FAQ</a>
        <a href="#contact" className="bg-mainPink text-white px-4 py-2 rounded hover:bg-mainBlue flex items-center">Contact</a>

        {/* Separate login buttons for Admin and Parent/Student. These call the global helper set by App to change route and role. */}
        <button
          onClick={() => (window as any).setAppRoute && (window as any).setAppRoute('login', 'admin')}
          className="text-sm text-gray-700 px-3 py-2 border rounded hover:bg-gray-50"
        >
          Admin Login
        </button>

        <button
          onClick={() => (window as any).setAppRoute && (window as any).setAppRoute('login', 'parent')}
          className="text-sm text-gray-700 px-3 py-2 border rounded hover:bg-gray-50"
        >
          Parent / Student Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
