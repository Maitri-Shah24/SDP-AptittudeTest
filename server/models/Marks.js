
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  student: String,
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  marks: [
    {
      subject: String,
      correctNumber: Number,
      correctScore: Number,
      notSelectedNumber: Number,
      notSelectedScore: Number,
      incorrectNumber: Number,
      incorrectScore: Number
    }
  ],
  correctMarks: Number,
  notSelectedMarks: Number,
  incorrectMarks: Number
  
});

const MarksModel = mongoose.model('Mark', markSchema);

module.exports = MarksModel;
