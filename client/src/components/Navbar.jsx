import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Auth from '../utils/auth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isLoggedIn, username } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Auth.logout();
    // No need to navigate manually as Auth.logout already does it
  };

  return (
    <nav className="bg-[#8b0000] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Wine className="h-8 w-8 mr-2" />
            <Link to="/" className="font-bold text-xl">
              Merlot-N-More
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              Home
            </Link>
            <Link to="/wines" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              All Wines
            </Link>
            <Link to="/wines/red" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              Red
            </Link>
            <Link to="/wines/white" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              White
            </Link>
            <Link to="/wines/rose" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              Rosé
            </Link>
            <Link to="/wines/sparkling" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
              Sparkling
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/favorites" className="px-3 py-2 rounded-md hover:bg-[#6b0000] font-medium">
                  My Favorites
                </Link>
                <div className="px-3 py-2 text-sm">
                  Welcome{username}!
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-white text-[#8b0000] rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md hover:bg-[#6b0000]">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 bg-white text-[#8b0000] rounded-md hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-[#6b0000] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/wines"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              All Wines
            </Link>
            <Link
              to="/wines/red"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Red
            </Link>
            <Link
              to="/wines/white"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              White
            </Link>
            <Link
              to="/wines/rose"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Rosé
            </Link>
            <Link
              to="/wines/sparkling"
              className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Sparkling
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link
                  to="/favorites"
                  className="block px-3 py-2 rounded-md hover:bg-[#6b0000] font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Favorites
                </Link>
                <div className="px-3 py-2 text-sm">
                  Welcome, {username}!
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-white text-[#8b0000] rounded-md hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-[#6b0000]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 bg-white text-[#8b0000] rounded-md hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;