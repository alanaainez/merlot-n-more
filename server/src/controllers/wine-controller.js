import { Wine } from '../models/Wine.js';

export const getAllWines = async (req, res) => {
  try {
    const wines = await Wine.find();
    res.json(wines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getWineById = async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (wine) {
      res.json(wine);
    } else {
      res.status(404).json({ message: 'Wine not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createWine = async (req, res) => {
  const wine = new Wine({
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    region: req.body.region,
    description: req.body.description,
    price: req.body.price,
    rating: req.body.rating,
  });

  try {
    const newWine = await wine.save();
    res.status(201).json(newWine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
