import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TotalEmpList from './Components/TotalEmpList'
import CreateEmp from './Components/CreateEmp'
import UpdateEmp from './Components/UpdateEmp'
import Employee from './Components/Employee'
import Navbar from './Components/Navbar';
import LoadingBar from 'react-top-loading-bar'


function App() {
  let [progress, setProgress] = useState(0)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <LoadingBar height={3} color='#000000' progress={progress} />
        <Routes>
          <Route path="/" element={<TotalEmpList setProgress={setProgress} />} />
          <Route path='/createEmp' element={<CreateEmp setProgress={setProgress} />} />
          <Route path="/updateEmp" element={<UpdateEmp setProgress={setProgress} />} />
          <Route path='/employee' element={<Employee setProgress={setProgress} />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
