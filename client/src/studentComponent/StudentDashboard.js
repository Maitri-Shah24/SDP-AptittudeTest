import React, { useEffect, useState } from 'react'
import StudentTestList from './StudentTestList'
import StudentNavbar from './StudentNavbar'
import SampleQues from './SampleQues'
import axios from 'axios';
import moment from 'moment-timezone';
import { resolveDateFormat } from '@mui/x-date-pickers/internals/utils/date-utils';
import NavigationMenu from './NavigationMenu';
import zIndex from '@mui/material/styles/zIndex';

export default function StudentDashboard() {

  const [currentComponent, setCurrentComponent] = useState('Test List');
  console.log(currentComponent)
  const renderCurrentComponent = () => {
    
    switch (currentComponent.text) {
      case 'Test List':
        console.log(currentComponent)
        return <StudentTestList />;
      case 'Sample Questions':
        console.log(currentComponent)
        return <SampleQues/>;
      default:
        console.log('default')
        return <StudentTestList />;
    }
  };
  
      return (
  <>
    <div >
      <StudentNavbar/>
      <div style={{ display: 'flex' }}>
        <NavigationMenu onItemClick={(component) => setCurrentComponent(component)}/>
         {renderCurrentComponent()}
      </div>
    </div>
  </>
  )
}
