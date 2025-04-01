import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Search, Heart } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Perfect Wine
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Browse, search, and save your favorite wines from around the world.
        </p>
        <Link
          to="/wines"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8b0000] hover:bg-[#6b0000]"
        >
          Start Exploring
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Search className="h-12 w-12 text-[#8b0000] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
          <p className="text-gray-600">
            Find wines by name, region, or flavor profile with our advanced search engine.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Wine className="h-12 w-12 text-[#8b0000] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Detailed Information</h3>
          <p className="text-gray-600">
            Get comprehensive details about each wine, including origin, characteristics, and ratings.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Heart className="h-12 w-12 text-[#8b0000] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Personal Collection</h3>
          <p className="text-gray-600">
            Save your favorite wines and keep track of your preferences.
          </p>
        </div>
      </div>

      <div className="mt-16 bg-[#fff8f8] rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Wines</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${i === 1 ? '1510812431401-41d2bd2722f3' : 
                      i === 2 ? '1553361371-9ccc88d3c28b' :
                      i === 3 ? '1547595628-c61a29f496f0' :
                      '1516594798947-e65505dbb29d'}`}
                alt="Wine"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold mb-1">Featured Wine {i}</h4>
                <p className="text-sm text-gray-600">Region • Type</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;