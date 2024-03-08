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

            <button className='back-button'>
            <svg height="25" width="25" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            <span>Back To DashBoard</span>
            </button>
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
