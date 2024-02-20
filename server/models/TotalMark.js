
const mongoose = require('mongoose');

const totalMarkSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  subjectWiseMarks: [
    {
      subject: String,
      marks: Number
    }
  ],
  totalMarks: Number
});

const TotalMarkModel = mongoose.model('TotalMark', totalMarkSchema);

module.exports = TotalMarkModel;
