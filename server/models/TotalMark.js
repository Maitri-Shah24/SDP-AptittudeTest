
const mongoose = require('mongoose');

const totalMarkSchema = new mongoose.Schema({
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  subjectWiseMarks: [
    {
      subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
      marks: Number
    }
  ],
  totalMarks: Number
});

const Mark = mongoose.model('TotalMark', totalMarkSchema);

module.exports = Mark;
