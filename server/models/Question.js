// models/Question.js

const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true,
  },
  courseID: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  weightage: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const QuestionModel = mongoose.model('Question', questionSchema);
module.exports = QuestionModel;
