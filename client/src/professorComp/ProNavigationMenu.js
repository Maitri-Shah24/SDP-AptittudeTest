import React from 'react'
import UpcomingIcon from '@mui/icons-material/Upcoming';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export const pronavigationMenu = [
    {
        title: "Result",
        icon: <CategoryIcon />,
        path: "/overallresult"    
    },
    {
        title: "Schedule Test",
        icon: <UpcomingIcon />,
        path : "/addtest"
    },
    {
        title: "Sample Questions",
        icon: <AutoAwesomeIcon/>,
        path: "/sampleque"

    },
];