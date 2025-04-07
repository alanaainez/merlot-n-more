import React, { useState, useEffect } from 'react';
import { Star, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWinesByType } from '../lib/api.js';

const topRoseWines = [
  {
    id: 1,
    name: "Château d'Esclans Whispering Angel 2022",
    region: "Provence, France",
    rating: 4.7,
    review_count: 245,
    description: "The world's most popular premium rosé, crisp and refreshing",
    image_url: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0"
  },
  {
    id: 2,
    name: "Domaines Ott Château Romassan 2021",
    region: "Bandol, France",
    rating: 4.8,
    review_count: 178,
    description: "Elegant and structured rosé with remarkable depth",
    image_url: "https://images.unsplash.com/photo-1654897332212-9686046ca3be"
  },
  {
    id: 3,
    name: "Miraval Côtes de Provence 2022",
    region: "Provence, France",
    rating: 4.6,
    review_count: 198,
    description: "Refined and elegant with delicate fruit notes",
    image_url: "https://images.unsplash.com/photo-1613732763629-f164d4edbc10"
  },
  {
    id: 4,
    name: "Château Minuty Rose et Or 2021",
    region: "Côtes de Provence, France",
    rating: 4.7,
    review_count: 156,
    description: "Premium rosé with exceptional balance and finesse",
    image_url: "https://images.unsplash.com/photo-1547595628-c61a29f496f0"
  },
  {
    id: 5,
    name: "Domaine Tempier Bandol Rosé 2021",
    region: "Bandol, France",
    rating: 4.8,
    review_count: 134,
    description: "Complex and age-worthy rosé with great structure",
    image_url: "https://images.unsplash.com/photo-1616186904277-22de3d06900c"
  },
  {
    id: 6,
    name: "Gérard Bertrand Clos du Temple 2020",
    region: "Languedoc, France",
    rating: 4.9,
    review_count: 145,
    description: "Ultra-premium rosé with extraordinary complexity",
    image_url: "https://images.unsplash.com/photo-1516996222644-b2db58d3422d"
  },
  {
    id: 7,
    name: "Chêne Bleu Rosé 2021",
    region: "Vaucluse, France",
    rating: 4.6,
    review_count: 167,
    description: "High-altitude rosé with remarkable freshness",
    image_url: "https://images.unsplash.com/photo-1635069259356-71009a36dd59"
  },
  {
    id: 8,
    name: "Château Léoube Love 2022",
    region: "Provence, France",
    rating: 4.5,
    review_count: 189,
    description: "Organic rosé with delicate red fruit notes",
    image_url: "https://plus.unsplash.com/premium_photo-1680087015323-9f4bc5f14585"
  },
  {
    id: 9,
    name: "AIX Rosé 2022",
    region: "Provence, France",
    rating: 4.4,
    review_count: 223,
    description: "Fresh and vibrant with classic Provençal character",
    image_url: "https://images.unsplash.com/photo-1573659418455-33ea4175400a"
  },
  {
    id: 10,
    name: "Château Pradeaux Bandol Rosé 2021",
    region: "Bandol, France",
    rating: 4.7,
    review_count: 156,
    description: "Traditional Bandol rosé with great depth",
    image_url: "https://plus.unsplash.com/premium_photo-1680086937598-cc9f3fe4c745"
  },
  {
    id: 11,
    name: "Domaine de Triennes Rosé 2022",
    region: "Provence, France",
    rating: 4.5,
    review_count: 178,
    description: "Value-driven rosé with impressive quality",
    image_url: "https://images.unsplash.com/photo-1704083043684-cf7c6cf4876e"
  },
  {
    id: 12,
    name: "Ultimate Provence UP Rosé 2022",
    region: "Provence, France",
    rating: 4.6,
    review_count: 167,
    description: "Modern style rosé with distinctive character",
    image_url: "https://images.unsplash.com/photo-1650840805630-132123042a20"
  }
];

const RoseWines = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Premium Rosé Wines</h1>
      
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
        {topRoseWines.map((wine) => (
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

export default RoseWines;
