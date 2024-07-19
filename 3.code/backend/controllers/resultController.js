const Results = require('../models/result');

exports.getResultsByPeriod = async (req, res) => {
  try {
    const { period } = req.params;
    const results = await Results.findOne({ period });
    
    if (!results) {
      return res.status(404).json({ message: 'Results not found' });
    }
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching results', error });
  }
};

exports.createResults = async (req, res) => {
  try {
    const results = new Results(req.body);
    await results.save();
    res.status(201).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error creating results', error });
  }
};