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
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000","https://aptittudetest.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

const port = 8000 ;

mongoose.connect(process.env.MONGODB_URI);

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

app.get('/profile/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const role = req.query.role; // Get the role from the query parameter
    let user;

    if (role === 'student') {
      user = await StudentModel.findOne({ studentId: userId });
    } else if (role === 'professor') {
      user = await ProfessorModel.findOne({ professorId: userId });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/profile/:userId', async (req, res) => {
  
  try {
    const userId = req.params.userId;
    const role = req.query.role; // Get the role from the query parameter
    let user;

    if (role === 'student') {
      user = await StudentModel.findOne({ studentId: userId });
      const { studentId, email, firstName, lastName } = req.body;
      user.studentId = studentId;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    } else if (role === 'professor') {
      user = await ProfessorModel.findOne({ professorId: userId });
      const { professorId, email, firstName, lastName } = req.body;
      user.professorId = professorId;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/register',(req,res)=>{
  console.log("k");
  StudentModel.findOne({ email: req.body.email })
  .then(existingStudent => {
    if (existingStudent) {
      res.json("exist")
      return;
    } else {
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

app.get('/test/:id/duration', async(req,res)=>{
  try{
    const test = await TestModel.findById(req.params.id);
    res.json({duration:test.duration,testName : test.testName});
  }catch (error) {
    console.error('Error fetching time:', error);
    res.status(500).json({ error: 'Failed to fetch Time' });
  }
})

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

    console.log(req.params.userid)
    const testId = req.params.id;
    const studentId = req.params.userid;

    MarksModel.findOne({student:studentId, test:testId}).then((existing)=>
    {
      if(existing){
        res.json(null);
        return;
      }
      else{
        const studentMarks = MarksModel.create({
          student:studentId,
          test: testId,
          marks: req.body.subjectMarks,
          correctMarks: req.body.correctMarks,
          notSelectedMarks: req.body.notSelectedMarks,
          incorrectMarks: req.body.incorrectMarks

        })
        res.json(studentMarks);
      }
    })
    

  }
  catch (error) {
    console.error('Error adding studentMarks:', error);
    res.status(500).json({ error: error.message });
  }

})

app.get("/test/:id/:user/result", async(req,res)=>{

  try{
    const studentMarks = await MarksModel.findOne({student:req.params.user, test:req.params.id});
    const totalMarks = await TotalMarkModel.findOne({test: req.params.id});
        res.json({totalMarks: totalMarks , studentMarks: studentMarks});
  }
  catch(error)
  {
    console.error("Error fetching marks",error);
    res.status(500).json({error:error.message});
  }

  
})


app.get("/test/:id/average-results",async(req,res)=>{
  try{
    const studentMarks = await MarksModel.find({ test:req.params.id});
    const totalMarks = await TotalMarkModel.findOne({test: req.params.id});
        res.json({totalMarks: totalMarks , studentMarks: studentMarks});
  }
  catch(error)
  {
    console.error("Error fetching marks",error);
    res.status(500).json({error:error.message});
  }
})

app.get('/result/:user',async(req,res)=>{
  try{
      const studentID = req.params.user;
      const marks = await MarksModel.find({ student: studentID });
      console.log(marks);
      const testIds = marks.map(mark => mark.test);
      const tests = await TestModel.find({ _id: { $in: testIds } });
      res.json({ tests: tests });

  }
  catch(error){
    console.error("Error fetching results test",error);
    res.status(500).json({error:error.message});
  }
})

app.get("/test/:user/historyresult",async(req,res)=>{
  try{
    console.log(req.params.user)
    const studentMarks = await MarksModel.find({student : req.params.user});
    console.log(studentMarks);
    const test = studentMarks.map(result=>result.test);

    const testName = test.map(async(testId)=>{
      const test = await TestModel.findById(testId);
      return test.testName;
    })

    const testNames = await Promise.all(testName);

    res.json({studentMarks:studentMarks, testName:testNames});
  }catch(error){
    console.error("Error fetching marks",error);
    res.status(500).json({error:error.message});
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});