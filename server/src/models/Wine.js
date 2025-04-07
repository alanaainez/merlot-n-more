import { Schema, model } from 'mongoose';

const wineSchema = new Schema({
  wineId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  region: {
    type: String,
  },
  rating: {
    type: Number,
  },
  image_url: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  winery: {
    type: String,
  },
  review_count: {
    type: Number,
    default: 0
  }
});

const Wine = model('Wine', wineSchema);

export default Wine;

export { Wine }
export const wineTypes = [
  'Red',
  'White',
  'Rose',
  'Sparkling',
  'Dessert',
  'Fortified'
];
export const wineRegions = [
  'California',
  'Oregon',
  'Washington',
  'New York',
  'Texas',
  'Virginia',
  'South Africa',
  'France',
  'Italy',
  'Spain',
  'Australia',
  'New Zealand'
];
export const wineRatings = [
  1, 2, 3, 4, 5
];
export const winePrices = [
  '$',
  '$$',
  '$$$',
  '$$$$',
  '$$$$$'
];
export const wineDescriptions = [
  'A bold and full-bodied red wine with notes of dark fruit and oak.',
  'A crisp and refreshing white wine with hints of citrus and floral aromas.',
  'A light and fruity rosé with flavors of strawberries and watermelon.',
  'A sparkling wine with a fine mousse and notes of green apple and brioche.',
  'A sweet dessert wine with flavors of honey and apricot.',
  'A rich fortified wine with flavors of dried fruit and nuts.'
];
export const wineWinerys = [
  'Chateau Montelena',
  'Stag’s Leap Wine Cellars',
  'Silver Oak',
  'Opus One',
  'Duckhorn Vineyards',
  'Robert Mondavi Winery',
  'Bodega Norton',
  'Penfolds',
  'Cloudy Bay',
  'Kim Crawford'
];
export const wineReviewCounts = [
  0, 1, 2, 3, 4, 5, 10, 20, 50, 100
];