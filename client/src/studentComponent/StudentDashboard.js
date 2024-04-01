import React, { useState } from 'react'
import StudentTestList from './StudentTestList'
import StudentNavbar from './StudentNavbar'
import SampleQues from './SampleQues'
import NavigationMenu from './NavigationMenu';
import History from './History';
import Result from './Result';

export default function StudentDashboard() {

  const [currentComponent, setCurrentComponent] = useState(() => {
    const storedItem = localStorage.getItem("activeItem");
    return storedItem ? JSON.parse(storedItem) : { text: "Test List" };
  });

  const renderCurrentComponent = () => {
    
    switch (currentComponent.text) {
      case 'Test List':
        return <StudentTestList />;
      case 'Sample Questions':
        return <SampleQues/>;
      case 'History':
        return <History/>;
      case 'Results':
        return <Result/>
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
