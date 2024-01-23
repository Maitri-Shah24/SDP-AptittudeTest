const mongoose=require('mongoose')

const studentSchema = mongoose.Schema({
    studentId: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    },
  });
  
  
  
const StudentModel = mongoose.model('Student',studentSchema)
module.exports = StudentModel;