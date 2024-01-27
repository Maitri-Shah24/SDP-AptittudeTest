console.log("Heloo");
const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Student')
const ProfessorModel = require('./models/Professor');
const TestModel = require('./models/Test');
const QuestionModel = require('./models/Question')

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
  .then(existingProfessor => {
    if (existingProfessor) {
      res.json("exist");
      return;
    } else {
      res.json("notexist")
      ProfessorModel.create(req.body)
        .then(newprofessor => res.json(newprofessor))
        .catch(err => res.status(500).json(err));
    }
  })
  .catch(err => res.status(500).json(err));

})

app.post('/test', async(req,res)=>{

  try {
    const existingTest = await TestModel.findOne({ testName: req.body.testName });

    if (existingTest) {
      // If a test with the same name exists, return an error response
      return res.status(400).json({ error: 'Test with the same name already exists.' });
    }
  TestModel.create(req.body)
    .then(newTest=>res.json(newTest))
  }
  catch(err) 
  {
    console.error('Error creating test:', err);
    res.status(500).json({ error: err.message });
  }

})

app.get('/tests', async (req, res) => {
  try {
    const tests = await TestModel.find();
    res.json(tests);
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/test/:testId/addQuestion', async (req, res) => {
  try {
    const testId = req.params.testId;

    const test = await TestModel.findById(testId);
    if (!test) {
      return res.status(404).json({ error: 'Test not found.' });
    }

    const questionData = req.body;
    questionData.test = testId;

    const newQuestion = await QuestionModel.create(questionData);
    res.json(newQuestion);

  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});