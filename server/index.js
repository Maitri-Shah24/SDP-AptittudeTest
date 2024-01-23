console.log("Heloo");
const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Student')
const ProfessorModel = require('./models/Professor')

const app = express()
app.use(express.json())
app.use(cors())
const port = 8000

mongoose.connect("mongodb://127.0.0.1:27017/aptitude-test")

app.post("/login", async (req, res) => {
  const { studentId, password } = req.body;
  StudentModel.findOne({ studentId: studentId }).then(user=>{
    if (user && user.password === password) {
      res.json("exist");
      return;
    } else {
      res.json("notexist");
    }
  }
)});

app.post('/register',(req,res)=>{

  StudentModel.findOne({ email: req.body.email })
  .then(existingStudent => {
    if (existingStudent) {
      res.json("exist")
      return;
    } else {
      res.json("notexist")
      StudentModel.create(req.body)
        .then(newStudent => res.json(newStudent))
        .catch(err => res.status(500).json(err));
    }
  })
  .catch(err => res.status(500).json(err));

})

app.post("/plogin", async (req, res) => {
  const { professorId, password } = req.body;
  ProfessorModel.findOne({ professorId: professorId }).then(user=>{
    if (user && user.password === password) {
      res.json("exist");
      return;
    } else {
      res.json("notexist");
    }
  }
)});

app.post('/pregister',(req,res)=>{

  ProfessorModel.findOne({ email: req.body.email })
  .then(existingStudent => {
    if (existingStudent) {
      res.json("exist");
      return;
    } else {
      res.json("notexist")
      ProfessorModel.create(req.body)
        .then(newStudent => res.json(newStudent))
        .catch(err => res.status(500).json(err));
    }
  })
  .catch(err => res.status(500).json(err));

})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});