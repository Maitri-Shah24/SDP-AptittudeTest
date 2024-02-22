import React from 'react'
import HistoryIcon from '@mui/icons-material/History';
import UpcomingIcon from '@mui/icons-material/Upcoming';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const navigationMenu = [
    {
        title: "History",
        icon: <HistoryIcon/>,
        path: "/history"    
    },
    {
        title: "Upcoming Test",
        icon: <UpcomingIcon />,
        path : "/upcomingtest"
    },
    {
        title: "Results",
        icon: <CategoryIcon />,
        path: "/results"
    },
    {
        title: "Sample Questions",
        icon: <AutoAwesomeIcon/>,
        path: "/sampleque"

    },
    {
        title: "Student Evaluation",
        icon: <BarChartIcon/>,
        path: "/evaluation"
    }
];