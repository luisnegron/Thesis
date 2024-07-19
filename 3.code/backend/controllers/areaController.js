// controllers/areaController.js
const Area = require('../models/area');

async function getAreas(req, res) {
  try {
    const areas = await Area.find();
    res.status(200).json(areas);
  } catch (error) {
    console.error('Error fetching areas:', error);
    res.status(500).json({ message: 'Error fetching areas' });
  }
}

async function getAreaById(req, res) {
  try {
    const { id } = req.params;
    const area = await Area.findById(id);
    if (!area) {
      return res.status(404).json({ message: 'Area not found' });
    }
    res.status(200).json(area);
  } catch (error) {
    console.error('Error fetching area:', error);
    res.status(500).json({ message: 'Error fetching area' });
  }
}

async function createArea(req, res) {
  try {
    const { name, description } = req.body;
    const newArea = new Area({ name, description });
    await newArea.save();
    res.status(201).json(newArea);
  } catch (error) {
    console.error('Error creating area:', error);
    res.status(500).json({ message: 'Error creating area' });
  }
}

async function updateArea(req, res) {
  try {
    const { id } = req.params;
    const updatedArea = await Area.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedArea);
  } catch (error) {
    console.error('Error updating area:', error);
    res.status(500).json({ message: 'Error updating area' });
  }
}

async function deleteArea(req, res) {
  try {
    const { id } = req.params;
    await Area.findByIdAndDelete(id);
    res.status(200).json({ message: 'Area deleted successfully' });
  } catch (error) {
    console.error('Error deleting area:', error);
    res.status(500).json({ message: 'Error deleting area' });
  }
}

module.exports = {
  getAreas,
  getAreaById,
  createArea,
  updateArea,
  deleteArea
};