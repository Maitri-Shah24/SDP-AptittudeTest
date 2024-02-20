
const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  marks: [
    {
      subject: String,
      score: Number
    }
  ]
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
