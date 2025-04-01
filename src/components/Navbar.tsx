import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wine className="h-8 w-8" style={{ color: '#8b0000' }} />
            <span className="text-xl font-bold text-gray-800">Merlot-N-More</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/wines" className="flex items-center space-x-1 text-gray-600 hover:text-[#8b0000]">
              <Search className="h-5 w-5" />
              <span>Browse</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;