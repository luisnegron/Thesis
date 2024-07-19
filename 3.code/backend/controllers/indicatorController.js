// controllers/indicatorController.js
const Indicator = require('../models/indicator');

async function getIndicators(req, res) {
  try {
    const indicators = await Indicator.find();
    res.status(200).json(indicators);
  } catch (error) {
    console.error('Error fetching indicators:', error);
    res.status(500).json({ message: 'Error fetching indicators' });
  }
}

async function getIndicatorById(req, res) {
  try {
    const { id } = req.params;
    const indicator = await Indicator.findById(id);
    if (!indicator) {
      return res.status(404).json({ message: 'Indicator not found' });
    }
    res.status(200).json(indicator);
  } catch (error) {
    console.error('Error fetching indicator:', error);
    res.status(500).json({ message: 'Error fetching indicator' });
  }
}

async function createIndicator(req, res) {
  try {
    const { name, description, value } = req.body;

    const newIndicator = new Indicator({ name, description, value });
    await newIndicator.save();
    res.status(201).json(newIndicator);
  } catch (error) {
    console.error('Error creating indicator:', error);
    res.status(500).json({ message: 'Error creating indicator' });
  }
}

async function updateIndicator(req, res) {
  try {
    const { id } = req.params;
    const updatedIndicator = await Indicator.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedIndicator);
  } catch (error) {
    console.error('Error updating indicator:', error);
    res.status(500).json({ message: 'Error updating indicator' });
  }
}

async function deleteIndicator(req, res) {
  try {
    const { id } = req.params;
    await Indicator.findByIdAndDelete(id);
    res.status(200).json({ message: 'Indicator deleted successfully' });
  } catch (error) {
    console.error('Error deleting indicator:', error);
    res.status(500).json({ message: 'Error deleting indicator' });
  }
}

module.exports = {
  getIndicators,
  getIndicatorById,
  createIndicator,
  updateIndicator,
  deleteIndicator
};