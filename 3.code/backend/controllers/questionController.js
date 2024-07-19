// controllers/questionController.js
const Question = require('../models/question');

async function getQuestions(req, res) {
  try {
    const questions = await Question.find({}).populate('subject');
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Error fetching questions' });
  }
}

async function getQuestionById(req, res) {
  try {
    const { id } = req.params;
    const question = await Question.findById(id).populate('subject');
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Error fetching question' });
  }
}

async function createQuestion(req, res) {
  try {
    const { text, options, correctAnswer, difficulty, subject } = req.body;

    const newQuestion = new Question({ text, options, correctAnswer, difficulty, subject });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Error creating question' });
  }
}

async function updateQuestion(req, res) {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Error updating question' });
  }
}

async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Error deleting question' });
  }
}

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
};