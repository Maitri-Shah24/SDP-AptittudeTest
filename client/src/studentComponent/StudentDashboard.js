import React from 'react'
import StudentTestList from './StudentTestList'
import StudentNavbar from './StudentNavbar'
import Navigation from './Navigation'
import { Grid } from "@mui/material";
import NavigationMenu from './NavigationMenu';

export default function StudentDashboard() {
  return (
    <>
      <StudentNavbar/>
          <StudentTestList/>
        
    </>
  )
}
