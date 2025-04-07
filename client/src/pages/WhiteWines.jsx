import React, { useState, useEffect } from 'react';
import { Star, Loader, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getWinesByType } from '../lib/api.js';

const topWhiteWines = [
  {
    id: 1,
    name: "Domaine Leflaive Montrachet 2019",
    region: "Burgundy, France",
    rating: 4.9,
    review_count: 178,
    description: "Legendary white Burgundy with exceptional minerality",
    image_url: "https://images.unsplash.com/photo-1558346489-19413928158b"
  },
  {
    id: 2,
    name: "Cloudy Bay Sauvignon Blanc 2022",
    region: "Marlborough, New Zealand",
    rating: 4.7,
    review_count: 245,
    description: "Iconic Sauvignon Blanc with vibrant citrus notes",
    image_url: "https://images.unsplash.com/photo-1659004418358-5c47e4c9b945"
  },
  {
    id: 3,
    name: "Château d'Yquem 2015",
    region: "Sauternes, France",
    rating: 4.9,
    review_count: 156,
    description: "Premier Cru Supérieur sweet wine with perfect balance",
    image_url: "https://images.unsplash.com/photo-1515779122185-2390ccdf060b"
  },
  {
    id: 4,
    name: "Kistler Chardonnay 2020",
    region: "Sonoma County, USA",
    rating: 4.6,
    review_count: 167,
    description: "Rich California Chardonnay with elegant oak",
    image_url: "https://images.unsplash.com/photo-1579721333016-b58535cc0dc3"
  },
  {
    id: 5,
    name: "Egon Müller Scharzhofberger Riesling 2018",
    region: "Mosel, Germany",
    rating: 4.8,
    review_count: 134,
    description: "Prestigious Riesling with incredible complexity",
    image_url: "https://images.unsplash.com/photo-1592931255321-0d5c35839e22"
  },
  {
    id: 6,
    name: "Puligny-Montrachet 1er Cru 2019",
    region: "Burgundy, France",
    rating: 4.7,
    review_count: 189,
    description: "Premier Cru white Burgundy with refined elegance",
    image_url: "https://plus.unsplash.com/premium_photo-1723914033344-b9aa59c5a27c"
  },
  {
    id: 7,
    name: "Didier Dagueneau Silex 2020",
    region: "Loire Valley, France",
    rating: 4.8,
    review_count: 145,
    description: "Exceptional Sauvignon Blanc with intense minerality",
    image_url: "https://images.unsplash.com/photo-1553682544-4ccf2778c9a8"
  },
  {
    id: 8,
    name: "Gaja Gaia & Rey Chardonnay 2018",
    region: "Piedmont, Italy",
    rating: 4.7,
    review_count: 156,
    description: "Italian Chardonnay masterpiece with great depth",
    image_url: "https://images.unsplash.com/photo-1599113656124-b96bf21e30d3"
  },
  {
    id: 9,
    name: "F.X. Pichler Grüner Veltliner 2021",
    region: "Wachau, Austria",
    rating: 4.6,
    review_count: 123,
    description: "Top Austrian Grüner with spice and mineral notes",
    image_url: "https://images.unsplash.com/photo-1661312219492-1ada9af899b9"
  },
  {
    id: 10,
    name: "Coche-Dury Meursault 2018",
    region: "Burgundy, France",
    rating: 4.9,
    review_count: 167,
    description: "Legendary Meursault with incredible precision",
    image_url: "https://images.unsplash.com/photo-1566754436776-816e4da647e1"
  },
  {
    id: 11,
    name: "Peter Michael Ma Belle-Fille 2019",
    region: "Knights Valley, USA",
    rating: 4.7,
    review_count: 134,
    description: "California Chardonnay with Burgundian influence",
    image_url: "https://images.unsplash.com/photo-1626880322790-1025e261d68f"
  },
  {
    id: 12,
    name: "Trimbach Clos Ste Hune 2017",
    region: "Alsace, France",
    rating: 4.8,
    review_count: 145,
    description: "Iconic dry Riesling with remarkable aging potential",
    image_url: "https://images.unsplash.com/photo-1727060800274-1256eeea33c1"
  }
];

const WhiteWines = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="container mx-auto px-4 py-8 relative min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Premium White Wines</h1>
      
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
        {topWhiteWines.map((wine) => (
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

export default WhiteWines;
