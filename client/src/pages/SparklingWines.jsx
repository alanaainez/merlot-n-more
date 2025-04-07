import React, { useState, useEffect } from 'react';
import { Star, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWinesByType } from '../lib/api.js';

const topSparklingWines = [
  {
    id: 1,
    name: "Dom Pérignon Vintage 2012",
    region: "Champagne, France",
    rating: 4.9,
    review_count: 289,
    description: "Prestigious vintage champagne with exceptional finesse",
    image_url: "https://images.unsplash.com/photo-1446822775955-c34f483b410b"
  },
  {
    id: 2,
    name: "Krug Grande Cuvée",
    region: "Champagne, France",
    rating: 4.8,
    review_count: 245,
    description: "Legendary multi-vintage blend with remarkable complexity",
    image_url: "https://images.unsplash.com/photo-1526894198609-10b3cdf45c52"
  },
  {
    id: 3,
    name: "Louis Roederer Cristal 2014",
    region: "Champagne, France",
    rating: 4.9,
    review_count: 198,
    description: "Iconic prestige cuvée with incredible precision",
    image_url: "https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1"
  },
  {
    id: 4,
    name: "Bollinger La Grande Année 2012",
    region: "Champagne, France",
    rating: 4.7,
    review_count: 167,
    description: "Vintage champagne with exceptional depth",
    image_url: "https://images.unsplash.com/photo-1547595628-c61a29f496f0"
  },
  {
    id: 5,
    name: "Ferrari Giulio Ferrari Riserva del Fondatore",
    region: "Trentino, Italy",
    rating: 4.8,
    review_count: 156,
    description: "Italy's finest sparkling wine with extended aging",
    image_url: "https://images.unsplash.com/photo-1580657274234-7339717f4541"
  },
  {
    id: 6,
    name: "Taittinger Comtes de Champagne 2008",
    region: "Champagne, France",
    rating: 4.8,
    review_count: 178,
    description: "Elegant blanc de blancs with remarkable finesse",
    image_url: "https://images.unsplash.com/photo-1613477581402-306fa9dc6b95"
  },
  {
    id: 7,
    name: "Nyetimber Tillington Single Vineyard 2013",
    region: "Sussex, England",
    rating: 4.6,
    review_count: 134,
    description: "Premium English sparkling wine with great elegance",
    image_url: "https://images.unsplash.com/photo-1580657264608-44775e61c0a1"
  },
  {
    id: 8,
    name: "Ruinart Blanc de Blancs",
    region: "Champagne, France",
    rating: 4.7,
    review_count: 223,
    description: "Chardonnay-based champagne with pure expression",
    image_url: "https://images.unsplash.com/photo-1558470570-c9a5a5ade867"
  },
  {
    id: 9,
    name: "Ca' del Bosco Annamaria Clementi",
    region: "Franciacorta, Italy",
    rating: 4.7,
    review_count: 145,
    description: "Top Franciacorta with exceptional refinement",
    image_url: "https://images.unsplash.com/photo-1623073284793-84dc366d4798"
  },
  {
    id: 10,
    name: "Pol Roger Sir Winston Churchill 2012",
    region: "Champagne, France",
    rating: 4.8,
    review_count: 167,
    description: "Powerful and complex prestige cuvée",
    image_url: "https://images.unsplash.com/photo-1588138678946-fae725e0b6e1"
  },
  {
    id: 11,
    name: "Billecart-Salmon Cuvée Nicolas François 2006",
    region: "Champagne, France",
    rating: 4.7,
    review_count: 156,
    description: "Prestigious vintage with remarkable balance",
    image_url: "https://plus.unsplash.com/premium_photo-1663840297231-a793d00eba6d"
  },
  {
    id: 12,
    name: "Schramsberg J. Schram 2011",
    region: "Napa Valley, USA",
    rating: 4.6,
    review_count: 134,
    description: "Premium California sparkling wine with depth",
    image_url: "https://images.unsplash.com/photo-1640055787574-d41d641ed3ed"
  }
];

const SparklingWines = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Premium Sparkling Wines</h1>
      
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
        {topSparklingWines.map((wine) => (
          <div key={wine.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={wine.image_url}
              alt={wine.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{wine.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{wine.region}</p>
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm text-gray-600">
                  {wine.rating} ({wine.review_count} reviews)
                </span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{wine.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Link 
        to="/wines" 
        className="fixed bottom-8 left-8 flex items-center justify-center bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group z-10"
      >
        <ArrowLeft className="h-8 w-8 text-[#8b0000] group-hover:scale-110 transition-transform duration-300" />
        <span className="ml-2 text-[#8b0000] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back to Wines
        </span>
      </Link>
    </div>
  );
};

export default SparklingWines;
