import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

export default function OverallResult() {
    const location = useLocation();
    const {id} = useParams();
    const [totalMarks, setTotalMarks] = useState(null);
    const navigate = useNavigate();
    const [totalCorrectNumber, setTotalCorrectNumber] = useState(0);
    const [totalIncorrectNumber, setTotalIncorrectNumber] = useState(0);
    const [totalNotSelectedNumber, setTotalNotSelectedNumber] = useState(0);
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [averageResults, setAverageResults] = useState(null); // Average results for all students
    
    useEffect(() => {
        const fetchAverageResults = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/test/${id}/average-results`);
                setAverageResults(response.data.studentMarks);
                setTotalMarks(response.data.totalMarks);
                console.log("Result ",response.data.studentMarks);
            } catch (error) {
                console.log("Fetching average results error: " + error);
            }
        };

        fetchAverageResults();
        // if (id) { // Only fetch average results if id is available
        //     fetchAverageResults();
        // }
    }, [id]);

    if (!averageResults) {
        return <div>Loading...</div>;
    }

    let subjectAverages = {};

    const averageSubjectResults = averageResults.map((subjectResult) => {


        // subjectResult.marks.map((subjectData)=>{
        //         console.log(subjectData.subject)
        //         if (!subjectAverages[subjectData.subject]) {
        //             subjectAverages[subjectData.subject] = { correctScore: 0, correctNumber: 0, incorrectNumber:0,incorrectScore:0,notSelectedNumber:0,notSelectedScore:0 };
        //         }
        //         subjectAverages[subjectData.subject].correctScore += subjectData.correctScore;
        //         subjectAverages[subjectData.subject].correctNumber+= subjectData.correctNumber;
        //         subjectAverages[subjectData.subject].incorrectScore += subjectData.incorrectScore;
        //         subjectAverages[subjectData.subject].correctNumber+= subjectData.correctNumber;
        //         subjectAverages[subjectData.subject].correctScore += subjectData.correctScore;
        //         subjectAverages[subjectData.subject].correctNumber+= subjectData.correctNumber;

        // })
        if (Array.isArray(subjectResult.marks)) {
            const totalStudents = subjectResult.marks.length;
    
            // Flatten the marks array to calculate the total number of questions and total marks for each subject
            const flatMarks = subjectResult.marks.flatMap(student => student);
    
            const totalCorrectNumber = flatMarks.reduce((acc, student) => acc + student.correctNumber, 0);
            const totalIncorrectNumber = flatMarks.reduce((acc, student) => acc + student.incorrectNumber, 0);
            const totalNotSelectedNumber = flatMarks.reduce((acc, student) => acc + student.notSelectedNumber, 0);
    
            const totalCorrectScore = flatMarks.reduce((acc, student) => acc + student.correctScore, 0);
            const totalIncorrectScore = flatMarks.reduce((acc, student) => acc + student.incorrectScore, 0);
            const totalNotSelectedScore = flatMarks.reduce((acc, student) => acc + student.notSelectedScore, 0);
    
            const averageCorrectNumber = totalCorrectNumber / totalStudents;
            const averageIncorrectNumber = totalIncorrectNumber / totalStudents;
            const averageNotSelectedNumber = totalNotSelectedNumber / totalStudents;
    
            const averageCorrectScore = totalCorrectScore / totalStudents;
            const averageIncorrectScore = totalIncorrectScore / totalStudents;
            const averageNotSelectedScore = totalNotSelectedScore / totalStudents;
    
            return {
                subject: subjectResult.subject,
                averageCorrectNumber,
                averageIncorrectNumber,
                averageNotSelectedNumber,
                averageCorrectScore,
                averageIncorrectScore,
                averageNotSelectedScore,
            };
        }
        return null;
    }).filter(result => result !== null);
    
    console.log(averageSubjectResults);
    
    

    const overallAverageResult = {
        averageCorrectScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.correctMarks, 0) / averageSubjectResults.length,
        averageNotSelectedScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.notSelectedMarks, 0) / averageSubjectResults.length,
        averageIncorrectScore: averageResults.reduce((acc, subjectResult) => acc + subjectResult.incorrectMarks, 0) / averageSubjectResults.length,
    };



    const data = [
        { id: 0, value: overallAverageResult.averageCorrectScore, label: 'Correct Marks' },
        { id: 1, value: overallAverageResult.averageNotSelectedScore, label: 'Not Attempted Marks' },
        { id: 2, value: overallAverageResult.averageIncorrectScore, label: 'Incorrect Marks' },
    ];

    return (
        <>
        <button className='back-button' onClick={()=>navigate("/professordashboard")}>
        <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
        <span>Back To DashBoard</span>
        </button>
        <div className='result-container'>
            <div className='overall-result'>
            <h2>Average Score: {overallAverageResult.averageCorrectScore} / {totalMarks.totalMarks}</h2>
                <PieChart
                    className='pie-chart'
                    series={[
                        {
                            data: data,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    height={200}
                    width={600}
                />
                <p style={{fontSize:'20px'}}>Total Question : {totalQuestion}</p>
                <div className='total-question'>                
                    <p style={{fontSize:'20px'}}>Correct Questions : {totalCorrectNumber}</p>
                    <p style={{fontSize:'20px'}}>Incorrect Questions : {totalIncorrectNumber}</p>
                    <p style={{fontSize:'20px'}}>Not Attempted Questions : {totalNotSelectedNumber}</p>
                </div>
                
            </div>
            
            {averageSubjectResults.map((subjectData, index) => (
                <div key={index} className='subject-result'>
                    <div className='subject-score'>
                         <h2>{subjectData.subject}</h2>
                         
                        <p>Average Score: {subjectData.averageCorrectScore}/{totalMarks.subjectWiseMarks[index]["marks"]}</p>
                       
                        <div style={{fontSize:'20px'}}>Questions not Attempted : {subjectData.averageNotSelectedNumber}</div>
                        <div style={{fontSize:'20px'}}>Questions Correct : {subjectData.averageCorrectNumber}</div>
                        <div style={{fontSize:'20px'}}>Questions Incorrect : {subjectData.averageIncorrectNumber}</div>
                        
                    </div>
                    <PieChart
                        className='pie-chart'
                        series={[
                            {
                                data: [
                                    { id: 0, value: subjectData.averageCorrectScore, label: 'Correct Marks' },
                                    { id: 1, value: subjectData.averageNotSelectedScore, label: 'Not Attempted Marks' },
                                    { id: 2, value: subjectData.averageIncorrectScore, label: 'Incorrect Marks' },
                                ],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={200}
                    />
                </div>
            ))}

        <div className='add-que TestDetails-button'>  
            <button type="submit" className="submit" onClick={()=>navigate(`/questionanswer/${id}`)} >
              View Correct Answer
            </button>
        </div>
        </div>
        </>
    );

}

