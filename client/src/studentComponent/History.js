import React, { useEffect, useState } from 'react';
import { useSession } from '../components/SessionContext';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

export default function History() {
    const { user } = useSession();
    const [result, setResult] = useState([]);
    const [testName,setTestName] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(testName);
    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/test/${user}/historyresult`);
                setResult(response.data.studentMarks);
                setTestName(response.data.testName);
                setLoading(false);
            } catch (error) {
                console.log("Fetching result error: " + error);
                setLoading(false);
            }
        };

        fetchMarks();
    }, [user]);

    
const chartSetting = {
    yAxis: [
      {
        label: 'Marks',
      },
    ],
    width: 500,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };

   const correctMarks =  result.map(entry => entry.correctMarks)
   const incorrectMarks=  result.map(entry => entry.incorrectMarks)
    const notSelectedMarks = result.map(entry => entry.notSelectedMarks)
    const tests = testName;
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!result || result.length === 0) {
        return <div>No data available</div>;
    }
    

        return (
            <div className='history-container'>   
                <BarChart className='history-graph'
                   xAxis={[{ scaleType: 'band', data: tests }]}
                    series={[{ data: correctMarks,label: 'Correct Marks' }, { data: incorrectMarks, label:'Incorrect Marks' }, { data: notSelectedMarks, label:'Not Attempted Marks' }]}
                    {...chartSetting}
                />
            </div>
        );
    }
