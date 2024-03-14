import React, { useState } from 'react'
import UpcomingIcon from '@mui/icons-material/Upcoming';
import CategoryIcon from '@mui/icons-material/Category';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ProNavigationMenu = ({ onItemClick }) => {
  const [open, setOpen] = useState(true);
  
  const menuItems = [
    {
      text: "Test List",
      icon: <UpcomingIcon  fontSize={!open ? "large" : "small"}/>,
      path : "/upcomingtest"
    },
    {
        text: "Results",
        icon: <CategoryIcon fontSize={!open ? "large" : "small"}/>,
        path: "/overallresult"    
    },
    {
        text: "Schedule Test",
        icon: <UpcomingIcon fontSize={!open ? "large" : "small"} />,
        path : "/addtest"
    },
    {
        text: "Sample Questions",
        icon: <AutoAwesomeIcon fontSize={!open ? "large" : "small"}/>,
        path: "/sampleque"

    },
  ];

  return (
    <div
      className={open ? "side-container" : "side-container side-container-NX"} >
      <div className="nav-upper">
        <div className="nav-heading">
          <button
            className={
              !open ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
            {menuItems.map(({text, icon,path}) => 
                <div className={open ? "menu-item" : "menu-item menu-item-NX"} onClick={()=> onItemClick({text})}>
                    <p>{icon}</p>
                    <p>{open && <p>{text}</p>}</p>
                    <p>{!open && <div className="tooltip">{text}</div>}</p>
                </div>
                )}
        </div>
      </div>
    </div>
  );
};

export default ProNavigationMenu;