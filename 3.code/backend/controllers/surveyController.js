const Survey = require('../models/survey');

// Get all surveys
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching surveys' });
  }
};

// Get a survey by ID
exports.getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (survey) {
      res.json(survey);
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching survey' });
  }
};

// Crear una nueva encuesta
exports.createSurvey = async (req, res) => {
    try {
      const survey = new Survey({
        title: req.body.title,
        code: req.body.code,
        type: req.body.type,
        date: req.body.date,
        status: req.body.status,
        period: req.body.period,
        instructions: req.body.instructions
      });
  
      const newSurvey = await survey.save();
      res.status(201).json(newSurvey);
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ message: 'Error creating survey' });
    }
  };

// Update a survey
exports.updateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (survey) {
      res.json(survey);
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating survey' });
  }
};

// Delete a survey
exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (survey) {
      res.json({ message: 'Survey deleted' });
    } else {
      res.status(404).json({ message: 'Survey not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting survey' });
  }
};
