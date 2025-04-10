import React, { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const WINE_FAVORITES_KEY = 'wineFavorites';

const topRedWines = [
  {
    id: 1,
    name: "Château Lafite Rothschild 2016",
    region: "Bordeaux, France",
    rating: 4.9,
    review_count: 245,
    description: "Exceptional balance with notes of blackcurrant and cedar.",
    image_url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    id: 2,
    name: "Screaming Eagle 2019",
    region: "Napa Valley, USA",
    rating: 4.8,
    review_count: 178,
    description: "Cult Cabernet with incredible depth and complexity.",
    image_url: "https://images.unsplash.com/photo-1630369160812-26c7604cbd8c"
  },
  {
    id: 3,
    name: "Domaine Romanée-Conti 2018",
    region: "Burgundy, France",
    rating: 4.9,
    review_count: 156,
    description: "Legendary Pinot Noir with exceptional finesse.",
    image_url: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb"
  },
  {
    id: 4,
    name: "Penfolds Grange 2017",
    region: "South Australia",
    rating: 4.7,
    review_count: 198,
    description: "Iconic Australian Shiraz with intense flavor.",
    image_url: "https://plus.unsplash.com/premium_photo-1682097091093-dd18b37764a5"
  },
  {
    id: 5,
    name: "Sassicaia 2018",
    region: "Tuscany, Italy",
    rating: 4.8,
    review_count: 167,
    description: "Super Tuscan with elegant tannins and depth.",
    image_url: "https://images.unsplash.com/photo-1597043851759-3b383a6d1c14"
  },
  {
    id: 6,
    name: "Opus One 2019",
    region: "Napa Valley, USA",
    rating: 4.7,
    review_count: 189,
    description: "Prestigious Bordeaux-style blend.",
    image_url: "https://plus.unsplash.com/premium_photo-1719997502353-88e25b8f266c"
  },
  {
    id: 7,
    name: "Vega Sicilia Único 2012",
    region: "Ribera del Duero, Spain",
    rating: 4.8,
    review_count: 145,
    description: "Legendary Spanish red with remarkable aging potential.",
    image_url: "https://images.unsplash.com/photo-1555554317-78e53094da14"
  },
  {
    id: 8,
    name: "Château Petrus 2015",
    region: "Pomerol, France",
    rating: 4.9,
    review_count: 134,
    description: "Exceptional Merlot with unparalleled complexity.",
    image_url: "https://images.unsplash.com/photo-1688073364804-f7e58eea2df4"
  },
  {
    id: 9,
    name: "Henschke Hill of Grace 2016",
    region: "Eden Valley, Australia",
    rating: 4.7,
    review_count: 156,
    description: "Single-vineyard Shiraz of remarkable character.",
    image_url: "https://images.unsplash.com/photo-1700455350393-34e80e3e0997"
  },
  {
    id: 10,
    name: "Masseto 2017",
    region: "Tuscany, Italy",
    rating: 4.8,
    review_count: 167,
    description: "Pure Merlot expression with incredible depth.",
    image_url: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea"
  },
  {
    id: 11,
    name: "Château Margaux 2016",
    region: "Bordeaux, France",
    rating: 4.8,
    review_count: 189,
    description: "Classic Bordeaux with exceptional elegance.",
    image_url: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d"
  },
  {
    id: 12,
    name: "Dominus Estate 2018",
    region: "Napa Valley, USA",
    rating: 4.7,
    review_count: 178,
    description: "Bordeaux-inspired blend with California character.",
    image_url: "https://plus.unsplash.com/premium_photo-1673347665800-e3d345610a99"
  }
];

const RedWines = () => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(WINE_FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const isFavorite = (wine) => favorites.some((w) => w.name === wine.name);

  const toggleFavorite = (wine) => {
    const updated = isFavorite(wine)
      ? favorites.filter((w) => w.name !== wine.name)
      : [...favorites, wine];

    setFavorites(updated);
    localStorage.setItem(WINE_FAVORITES_KEY, JSON.stringify(updated));

    toast.success(
      isFavorite(wine)
        ? 'Removed from favorites'
        : `Added "${wine.name}" to favorites`
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Premium Red Wines</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topRedWines.map((wine) => (
          <div key={wine.id} className="group relative h-[340px] perspective">
            {/* Star Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(wine);
              }}
              className="absolute top-2 right-2 z-20"
            >
              <Star
                className={`h-5 w-5 ${
                  isFavorite(wine)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>

            {/* Card */}
            <div className="relative w-full h-full transform-style-preserve-3d transition-transform duration-500 card-flip">


              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={wine.image_url}
                  alt={wine.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{wine.name}</h3>
                  <p className="text-sm text-gray-600">{wine.region}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {wine.rating} ({wine.review_count} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-lg p-4 shadow-md">
                <h4 className="text-md font-semibold mb-2">{wine.name}</h4>
                <p className="text-sm text-gray-700">{wine.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/wines"
        className="fixed bottom-8 left-8 flex items-center justify-center bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group z-10"
      >
        <ArrowLeft className="h-8 w-8 text-[#8b0000]" />
        <span className="ml-2 text-[#8b0000] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Back to Wines
        </span>
      </Link>

      {/* Flip styles */}
      <style>{`
  .perspective {
    perspective: 1200px;
  }
  .transform-style-preserve-3d {
    transform-style: preserve-3d;
  }
  .backface-hidden {
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }


  .card-flip:hover {
    transform: rotateY(180deg);
  }
`}</style>

 
    </div>
  );
};

export default RedWines;
