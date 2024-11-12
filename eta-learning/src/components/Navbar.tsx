import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-md py-4 px-8 flex justify-between items-center z-50">
      <div className="text-2xl font-bold text-mainPink">E+A</div>
      <div className="flex gap-4">
        <a href="/" className="text-mainPink hover:text-mainBlue">Home</a>
        <a href="#success-stories" className="text-mainPink hover:text-mainBlue">Success Stories</a>
        <a href="/faq" className="text-mainPink hover:text-mainBlue">FAQ</a>
        <a href="/contact" className="bg-mainPink text-white px-4 py-2 rounded hover:bg-mainBlue">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
