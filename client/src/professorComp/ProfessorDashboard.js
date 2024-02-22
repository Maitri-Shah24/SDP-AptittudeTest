import React from 'react'
import TestList from './TestList'
import ProfessorNavbar from './ProfessorNavbar'
import { Grid } from '@mui/material'
import ProNavigation from './ProNavigation'



export default function Dashboard() {
  return (
    <div>
       <>
      <ProfessorNavbar/>
      <Grid container className="px-5 lg:px-9 justify-between">
        <Grid item xs={12} lg={3} className="w-full lg:relative lg:sticky lg:top-0">
          <ProNavigation className='text-blue-500' />
        </Grid>
        <Grid item xs={12} lg={9} className='px-5'>
          <TestList/>
        </Grid>
      </Grid>
    </>
      
    </div>
  )
}
