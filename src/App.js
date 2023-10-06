import React from 'react';
import './App.css';
import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';

function App() {
  return (
    <div className="App">
    <h1 className='c1'>Employee Dashboard</h1>
      <EmployeeDetails/>
      <EmployeeList/>
    </div>
    
  );
}

export default App;
