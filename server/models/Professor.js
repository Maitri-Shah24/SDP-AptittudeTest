const mongoose=require('mongoose')

const professorSchema = mongoose.Schema({
    professorId: {
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
  
  
  
const ProfessorModel = mongoose.model('Professor',professorSchema)
module.exports = ProfessorModel;