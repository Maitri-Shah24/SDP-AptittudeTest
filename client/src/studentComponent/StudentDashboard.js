import React from 'react'
import StudentTestList from './StudentTestList'
import StudentNavbar from './StudentNavbar'
import Navigation from './Navigation'
import { Grid } from "@mui/material";

export default function StudentDashboard() {
  return (
    <>
      <StudentNavbar/>
      <Grid container className="px-5 lg:px-9 justify-between">
        <Grid item xs={12} lg={3} className="w-full lg:relative lg:sticky lg:top-0">
          <Navigation className='text-blue-500' />
        </Grid>
        <Grid item xs={12} lg={9} className='px-5'>
          <StudentTestList/>
        </Grid>
      </Grid>
    </>
  )
}
