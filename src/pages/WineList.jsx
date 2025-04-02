import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Loader } from 'lucide-react';
import { searchWines } from '../lib/api.js';

const wineTypes = [
  {
    type: "Red Wine",
    description: "Full-bodied and rich in tannins, red wines range from light Pinot Noir to bold Cabernet Sauvignon. Perfect with red meats and hearty dishes.",
    image: "https://images.unsplash.com/photo-1561461056-77634126673a"
  },
  {
    type: "White Wine",
    description: "Crisp and refreshing, white wines vary from dry Chardonnay to sweet Riesling. Ideal with seafood, poultry, and light dishes.",
    image: "https://images.unsplash.com/photo-1558346489-19413928158b"
  },
  {
    type: "Rosé",
    description: "Fresh and vibrant, rosé wines offer the perfect balance between red and white. Great for summer and light Mediterranean cuisine.",
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0"
  },
  {
    type: "Sparkling",
    description: "Effervescent and celebratory, sparkling wines like Champagne and Prosecco are perfect for celebrations and appetizers.",
    image: "https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1"
  }
];

const WineList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [wines, setWines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWines = async () => {
      if (searchTerm.length < 2) return;

      setLoading(true);
      setError('');
      try {
        const results = await searchWines(searchTerm);
        setWines(results);
      } catch (err) {
        setError('Failed to fetch wines. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchWines, 500);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const filteredWines = wines.filter(wine => {
    const matchesType = !selectedType || wine.title.toLowerCase().includes(selectedType.toLowerCase());
    return matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Wine Collection</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search wines..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8b0000] focus:border-[#8b0000] w-full"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#8b0000] focus:border-[#8b0000] w-full appearance-none"
            >
              <option value="">All Types</option>
              <option value="red">Red Wine</option>
              <option value="white">White Wine</option>
              <option value="sparkling">Sparkling Wine</option>
              <option value="rose">Rosé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Wine Types Guide */}
      <div className="mb-12 bg-[#fff8f8] rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wine Types Guide</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wineTypes.map((wine) => (
            <div
              key={wine.type}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={wine.image}
                  alt={wine.type}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-xl font-semibold text-white">
                  {wine.type}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">
                  {wine.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 text-[#8b0000] animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {!loading && !error && wines.length === 0 && searchTerm.length >= 2 && (
        <div className="text-center py-12 text-gray-500">
          No wines found. Try a different search term.
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWines.map((wine) => (
          <div key={wine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={wine.imageUrl || 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'}
              alt={wine.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{wine.title}</h3>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {wine.averageRating.toFixed(1)} ({wine.ratingCount} reviews)
                </span>
              </div>
              <p className="text-[#8b0000] font-semibold mb-4">{wine.price}</p>
              <p className="text-gray-500 text-sm line-clamp-3">{wine.description}</p>
              <a
                href={wine.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[#8b0000] hover:text-[#6b0000] text-sm font-medium"
              >
                Learn More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineList;
