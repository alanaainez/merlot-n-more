/*
  # Initial Schema Setup for Wine Application

  1. New Tables
    - `profiles`
      - Stores user profile information
      - Links to Supabase auth.users
    - `wines`
      - Main wine catalog
      - Stores wine details and characteristics
    - `user_favorites`
      - Tracks user's favorite wines
      - Links users to wines
    - `wine_categories`
      - Wine categorization (red, white, sparkling, etc.)
    - `wine_regions`
      - Wine origin regions
  
  2. Security
    - Enable RLS on all tables
    - Set up appropriate access policies
*/

-- Create wine categories table
CREATE TABLE wine_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create wine regions table
CREATE TABLE wine_regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create wines table
CREATE TABLE wines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category_id uuid REFERENCES wine_categories(id),
  region_id uuid REFERENCES wine_regions(id),
  vintage int,
  price decimal(10,2),
  alcohol_content decimal(4,2),
  description text,
  flavor_profile jsonb,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  full_name text,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user favorites table
CREATE TABLE user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  wine_id uuid REFERENCES wines(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, wine_id)
);

-- Enable RLS
ALTER TABLE wine_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE wine_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE wines ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public categories are viewable by everyone"
  ON wine_categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public regions are viewable by everyone"
  ON wine_regions FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public wines are viewable by everyone"
  ON wines FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view their favorites"
  ON user_favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their favorites"
  ON user_favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their favorites"
  ON user_favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert some initial categories
INSERT INTO wine_categories (name, description) VALUES
  ('Red', 'Red wines'),
  ('White', 'White wines'),
  ('Rosé', 'Rosé wines'),
  ('Sparkling', 'Sparkling wines'),
  ('Dessert', 'Dessert wines');

-- Insert some initial regions
INSERT INTO wine_regions (name, country, description) VALUES
  ('Bordeaux', 'France', 'Famous for its red wine blends'),
  ('Tuscany', 'Italy', 'Home of Chianti and Super Tuscans'),
  ('Napa Valley', 'United States', 'Known for Cabernet Sauvignon'),
  ('Rioja', 'Spain', 'Famous for Tempranillo-based wines'),
  ('Marlborough', 'New Zealand', 'Known for Sauvignon Blanc');