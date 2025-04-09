import React from 'react';
import { Link } from 'react-router-dom';
import { Wine, Search, Heart, Star } from 'lucide-react';

const topSellingWines = [
  {
    id: 1,
    name: "Château Margaux 2015",
    region: "Bordeaux, France",
    rating: 4.8,
    reviews: 245,
    description: "An exceptional vintage with notes of black fruit and tobacco",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3"
  },
  {
    id: 2,
    name: "Opus One 2018",
    region: "Napa Valley, USA",
    rating: 4.9,
    reviews: 189,
    description: "Bold Cabernet blend with remarkable complexity",
    image: "https://plus.unsplash.com/premium_photo-1719997502353-88e25b8f266c"
  },
  {
    id: 3,
    name: "Dom Pérignon 2012",
    region: "Champagne, France",
    rating: 4.7,
    reviews: 312,
    description: "Prestigious champagne with exceptional finesse",
    image: "https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1"
  },
  {
    id: 4,
    name: "Sassicaia 2017",
    region: "Tuscany, Italy",
    rating: 4.6,
    reviews: 178,
    description: "Super Tuscan with elegant tannins and depth",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb"
  },
  {
    id: 5,
    name: "Penfolds Grange 2016",
    region: "South Australia",
    rating: 4.8,
    reviews: 156,
    description: "Iconic Australian Shiraz with intense flavor",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0"
  },
  {
    id: 6,
    name: "Cloudy Bay 2021",
    region: "Marlborough, NZ",
    rating: 4.5,
    reviews: 234,
    description: "Crisp Sauvignon Blanc with citrus notes",
    image: "https://images.unsplash.com/photo-1558346489-19413928158b"
  },
  {
    id: 7,
    name: "Vega Sicilia Único 2011",
    region: "Ribera del Duero, Spain",
    rating: 4.9,
    reviews: 145,
    description: "Prestigious Spanish red with remarkable aging potential",
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea"
  },
  {
    id: 8,
    name: "Whispering Angel 2022",
    region: "Provence, France",
    rating: 4.4,
    reviews: 289,
    description: "Popular rosé with delicate fruit notes",
    image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0"
  },
  {
    id: 9,
    name: "Tignanello 2019",
    region: "Tuscany, Italy",
    rating: 4.7,
    reviews: 167,
    description: "Antinori's flagship Super Tuscan blend",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d"
  },
  {
    id: 10,
    name: "Krug Grande Cuvée",
    region: "Champagne, France",
    rating: 4.8,
    reviews: 198,
    description: "Prestigious multi-vintage champagne blend",
    image: "https://images.unsplash.com/photo-1526894198609-10b3cdf45c52"
  },
  {
    id: 11,
    name: "Caymus Special Selection 2018",
    region: "Napa Valley, USA",
    rating: 4.6,
    reviews: 223,
    description: "Premium Cabernet with rich dark fruit",
    image: "https://images.unsplash.com/photo-1553682544-4ccf2778c9a8"
  },
  {
    id: 12,
    name: "Château d'Yquem 2015",
    region: "Sauternes, France",
    rating: 4.9,
    reviews: 134,
    description: "Legendary sweet wine with perfect balance",
    image: "https://images.unsplash.com/photo-1569919659476-f0852f6834b7"
  }
];

const Home = () => {
  return (
    <div className="relative h-full overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/merlotnmorevid1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 max-w-7xl mx-auto bg-black/60 text-white p-8 rounded-lg">
        <div className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">Discover Your Perfect Wine</h1>
          <p className="text-xl text-gray-300 mb-8">
            Browse, search, and save your favorite wines from around the world.
          </p>
          <Link
            to="/wines"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#8b0000] hover:bg-[#6b0000]"
          >
            Start Exploring
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 text-black">
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

        {/* Top Selling Wines */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Top Selling Wines</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topSellingWines.map((wine) => (
              <div key={wine.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <img
                  src={wine.image}
                  alt={wine.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 text-black">
                  <h3 className="font-semibold text-lg mb-1">{wine.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{wine.region}</p>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {wine.rating} ({wine.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{wine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        <div className="mt-16 bg-[#fff8f8] rounded-xl p-8 text-black">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    i === 1
                      ? '1510812431401-41d2bd2722f3'
                      : i === 2
                      ? '1598306442928-4d90f32c6866'
                      : i === 3
                      ? '1547595628-c61a29f496f0'
                      : '1506377247377-2a5b3b417ebb?w'
                  }`}
                  alt="Wine"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-1">Featured Collection {i}</h4>
                  <p className="text-sm text-gray-600">Region • Type</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
