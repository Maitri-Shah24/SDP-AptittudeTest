import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSession } from '../components/SessionContext';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

export default function StudentResult() {
    const location = useLocation();
    const id = location.state ? location.state.testId : null;
    const { user } = useSession();
    const [result, setResult] = useState(null);
    const [totalMarks, setTotalMarks] = useState(null);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/test/${id}/${user}/result`);
                setResult(response.data.studentMarks);
                setTotalMarks(response.data.totalMarks);
            } catch (error) {
                console.log("Fetching result error: " + error);
            }
        };

        if (id) { // Only fetch marks if id is available
            fetchMarks();
        }
    }, [id, user]);

    if (!result || !totalMarks) {
        return <div>Loading...</div>;
    }

    const data = [
        { id: 0, value: result.correctMarks, label: 'Correct Marks' },
        { id: 1, value: result.notSelectedMarks, label: 'Not Attempted Marks' },
        { id: 2, value: result.incorrectMarks, label: 'Incorrect Marks' },
    ];

    return (
        <div>
            <h2>Your Score: {result.correctMarks}/{totalMarks.totalMarks}</h2>

            <PieChart
                series={[
                    {
                        data: data,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                ]}
                height={200}
            />

            {result.marks.map((subjectData, index) => (
                <div key={index} className='d-flex'>
                    <div>
                        <h2>{subjectData.subject}</h2>
                        <p>Your Score: {subjectData.correctScore}/{totalMarks.subjectWiseMarks[index]["marks"]}</p>
                    </div>

                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: subjectData.correctScore, label: 'Correct Marks' },
                                    { id: 1, value: subjectData.notSelectedScore, label: 'Not Attempted Marks' },
                                    { id: 2, value: subjectData.incorrectScore, label: 'Incorrect Marks' },
                                ],
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            },
                        ]}
                        height={200}
                    />
                </div>
            ))}
        </div>
    );
}
