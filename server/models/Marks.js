
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  student: String,
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  marks: [
    {
      subject: String,
      score: Number
    }
  ],
  totalMarks: Number,
  incorrect: [
    {
      subject: String,
      incorrectNumber: Number
    }
  ]
});

const MarksModel = mongoose.model('Mark', markSchema);

module.exports = MarksModel;
