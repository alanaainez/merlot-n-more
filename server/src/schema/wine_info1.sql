/*
  # Add Wine Data Schema

  1. New Tables
    - `wine_details`
      - Stores detailed wine information
      - Includes name, type, description, price, rating, etc.
    - `wine_inventory`
      - Tracks available wines
      - Links to wine_details

  2. Security
    - Enable RLS on all tables
    - Set up appropriate access policies
*/

-- Create wine details table
CREATE TABLE wine_details (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  winery text,
  region text,
  year integer,
  price decimal(10,2),
  description text,
  rating decimal(3,2),
  review_count integer DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wine inventory table
CREATE TABLE wine_inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_id uuid REFERENCES wine_details(id) ON DELETE CASCADE,
  quantity integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE wine_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE wine_inventory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Wine details are viewable by everyone"
  ON wine_details FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Wine inventory is viewable by everyone"
  ON wine_inventory FOR SELECT
  TO public
  USING (true);

-- Insert sample data for red wines
INSERT INTO wine_details (name, type, winery, region, year, price, description, rating, review_count, image_url) VALUES
  ('Cabernet Sauvignon Reserve', 'Red', 'Napa Valley Vineyards', 'Napa Valley', 2018, 75.99, 'Full-bodied with notes of blackberry and cedar', 4.5, 128, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3'),
  ('Merlot Classic', 'Red', 'Bordeaux Estates', 'Bordeaux', 2019, 45.99, 'Smooth with hints of cherry and chocolate', 4.3, 96, 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3');

-- Insert sample data for white wines
INSERT INTO wine_details (name, type, winery, region, year, price, description, rating, review_count, image_url) VALUES
  ('Chardonnay Reserve', 'White', 'Sonoma Winery', 'Sonoma', 2020, 38.99, 'Crisp and bright with apple and vanilla notes', 4.4, 112, 'https://images.unsplash.com/photo-1558346489-19413928158b'),
  ('Sauvignon Blanc', 'White', 'Loire Valley Wines', 'Loire Valley', 2021, 29.99, 'Fresh and aromatic with citrus notes', 4.2, 87, 'https://images.unsplash.com/photo-1558346489-19413928158b');

-- Insert sample data for rosé wines
INSERT INTO wine_details (name, type, winery, region, year, price, description, rating, review_count, image_url) VALUES
  ('Provence Rosé', 'Rosé', 'Provence Vineyards', 'Provence', 2021, 32.99, 'Light and refreshing with strawberry notes', 4.3, 94, 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0'),
  ('Summer Rosé', 'Rosé', 'Mediterranean Wines', 'Côtes de Provence', 2022, 27.99, 'Delicate with hints of peach and rose', 4.1, 76, 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0');

-- Insert sample data for sparkling wines
INSERT INTO wine_details (name, type, winery, region, year, price, description, rating, review_count, image_url) VALUES
  ('Champagne Brut', 'Sparkling', 'Champagne House', 'Champagne', 2018, 89.99, 'Elegant with fine bubbles and brioche notes', 4.6, 156, 'https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1'),
  ('Prosecco Extra Dry', 'Sparkling', 'Veneto Vintners', 'Veneto', 2021, 24.99, 'Light and fruity with apple and pear notes', 4.2, 92, 'https://plus.unsplash.com/premium_photo-1677327746215-6d9411e306f1');
  