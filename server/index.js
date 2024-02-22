console.log("Heloo");
const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose')
const cors = require('cors')
const StudentModel = require('./models/Student')
const ProfessorModel = require('./models/Professor');
const TestModel = require('./models/Test');
const QuestionModel = require('./models/Question');
const TotalMarkModel = require('./models/TotalMark');
const MarksModel = require('./models/Marks');

const app = express()
app.use(express.json())
app.use(cors())
const port = 8000

mongoose.connect("mongodb://127.0.0.1:27017/aptitude-test")

app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.post("/login", async (req, res) => {
  const { studentId, password } = req.body;
  StudentModel.findOne({ studentId: studentId }).then(user=>{
    if (user && user.password === password) {
      req.session.user = user;
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

app.get('/test/:testId/marks',async(req,res)=>{
  try{
    const testId = req.params.testId;
    console.log(testId);
    const totalMark = await TotalMarkModel.findOne({test: testId})
    console.log(totalMark.subjectWiseMarks);
    console.log(totalMark.totalMarks);
    res.json({
      subjectWiseMarks: totalMark.subjectWiseMarks,
      totalMarks: totalMark.totalMarks
    });
  }catch (error) {
    console.error('Error fetching marks', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/test/:testId/:questionId/marks',async(req,res)=>{


    const Qid = req.params.questionId;
    console.log(Qid);
    const question = await QuestionModel.findById(Qid);
    console.log(question);
    const marks = await TotalMarkModel.findOne({test :  question.test});
    res.json({question:question,
      subjectWiseMarks: marks.subjectWiseMarks,
      totalMarks: marks.totalMarks});

})

app.put('/test/:testId/update',async(req,res)=>{try {
  const { testId } = req.params;
  const { subjectWiseMarks, totalMarks } = req.body;

  const updatedTotalMarks = await TotalMarkModel.findOneAndUpdate(
    { test: testId },
    { subjectWiseMarks, totalMarks },
    { new: true }
  );

  res.json(updatedTotalMarks);
} catch (error) {
  console.error('Error updating total marks:', error);
  res.status(500).json({ error: error.message });
}
});

app.get('/test/:id/questions', async (req, res) => {
  const id = req.params.id;
  
  try {
    const questions = await QuestionModel.find({ test: id });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

app.delete('/questions/:id/delete', async (req, res) => {
  const id = req.params.id;
  try {

   const question = await QuestionModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Failed to delete question' }); 
  }
});

app.post("/totalMarkTestID", async (req, res) => {
  try {
    const testId = req.body.test;
    const test = await TotalMarkModel.findOne({ test: testId });

    if (!test) {
      const newTotalMark = await TotalMarkModel.create({
        test: testId,
        subjectWiseMarks: [],
        totalMarks: 0
      });
      res.json(newTotalMark);
    } else {
      res.json(test);
    }
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/test/:id/getSubjects" , async(req,res)=>
{
  try{
    const testId = req.params.id;
    const totalMarks = await TotalMarkModel.findOne({test : testId});
    console.log(totalMarks.subjectWiseMarks);
    res.json(totalMarks.subjectWiseMarks);

  }
  catch(error){
    console.error('Error fetching subject:', error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
})

app.post("/test/:id/studentMarks/:userid" , async(req,res)=>{
  try{

    const testId = req.params.id;
    const studentId = req.params.userid;

    MarksModel.findOne({student:studentId, test:testId}).then((existing)=>
    {
      if(existing){
        return;
      }
      else{
        const studentMarks = MarksModel.create({
          student:studentId,
          test: testId,
          marks: req.body.subjectMarks,
          totalMarks: req.body.totalMarks,
          incorrect: req.body.incorrect
        })
      }
    })
    

  }
  catch (error) {
    console.error('Error adding studentMarks:', error);
    res.status(500).json({ error: error.message });
  }

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});