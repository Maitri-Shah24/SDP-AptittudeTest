import React, { useState } from 'react'
import TestList from './TestList'
import ProfessorNavbar from './ProfessorNavbar'
import ProNavigationMenu from './ProNavigationMenu'
import SampleQues from '../studentComponent/SampleQues'
import AddTest from './AddTest'
import ResultTest from './ResultTest'



export default function Dashboard() {
  const [currentComponent, setCurrentComponent] = useState('Test List');
  console.log(currentComponent)
  const renderCurrentComponent = () => {
    
    switch (currentComponent.text) {
      case 'Test List':
        console.log(currentComponent)
        return <TestList />;
      case 'Sample Questions':
        console.log(currentComponent)
        return <SampleQues/>;
      case 'Schedule Test':
        return <AddTest/>;
      case 'Results':
        return <ResultTest/>;
      default:
        console.log('default')
        return <TestList />;
    }
  };
  return (
       <>
      <ProfessorNavbar/>
      <div style={{ display: 'flex' }}>
        <ProNavigationMenu onItemClick={(component) => setCurrentComponent(component)}/>
         {renderCurrentComponent()}
      </div>
    </>  
   
  );
}
