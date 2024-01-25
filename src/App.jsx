import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TotalEmpList from './Components/TotalEmpList'
import CreateEmp from './Components/CreateEmp'
import UpdateEmp from './Components/UpdateEmp'
import Employee from './Components/Employee'
import Navbar from './Components/Navbar'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TotalEmpList />} />
          <Route path='/createEmp' element={<CreateEmp />} />
          <Route path="/updateEmp" element={<UpdateEmp />} />
          <Route path='/employee' element={<Employee />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
