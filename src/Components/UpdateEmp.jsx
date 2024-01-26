import React, { useEffect, useState } from 'react';
import "./UpdateEmp.css"
import axios from 'axios';
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom';

function UpdateEmp() {
  let [inData, setInData] = useState({ firstName: "", lastName: "", email: "", mobile: "", age: "", address: "", gender: "" })
  let [toggle, setToggle] = useState(false);
  // let [redirect, setRedirect] = useState(false);
  let navigate = useNavigate();
  let empId = localStorage.getItem("empId")
  let fetchApiData = async () => {
    let { data } = await axios.get(`http://localhost:3000/employeedb/${empId}`);
    setInData(data);
  }
  useEffect(() => {
    fetchApiData();
  }, [])
  let getInputData = ({ target: { name, value } }) => {
    setInData({ ...inData, [name]: value })
  }
  let sendFormData = async (e) => {
    e.preventDefault();
    let sendData = await axios.put(`http://localhost:3000/employeedb/${empId}`, inData);
    // console.log(sendData)
    setToggle(true)
    setTimeout(() => {
      navigate("/")
    }, 2000);
  }
  useEffect(() => {
    setTimeout(() => {
      setToggle(false)
    }, 2000);
  }, [toggle])
  return (
    <>
      {toggle && <PopUp bgcolor="blue" msg="User details Updated" />}
      <form className='udateForm container col-md-12 border border-primary mt-4 p-3' onSubmit={sendFormData} >
        <h1 className='text-primary' style={{ textAlign: "center", fontWeight: "bold" }}>Update EMPLOYEE</h1>
        <section className='container row'>
          <div className='my-3 col-md-6'>
            <input type="text" name="firstName" value={inData.firstName} onChange={getInputData} className='form-control border-primary' placeholder='First Name' />
          </div>
          <div className='my-3 col-md-6'>
            <input type="text" name="lastName" value={inData.lastName} onChange={getInputData} className='form-control border-primary' placeholder='Last Name' />
          </div>
        </section>
        <section className='container row'>
          <div className='my-3 col-md-6'>
            <input type="email" name="email" value={inData.email} onChange={getInputData} className='form-control border-primary' placeholder='Email' />
          </div>
          <div className='my-3 col-md-6'>
            <input type="tel" name="mobile" value={inData.mobile} onChange={getInputData} className='form-control border-primary' placeholder='Mobile' />
          </div>
        </section>
        <section className='container row'>
          <div className='my-3 col-md-6'>
            <input type="number" name="age" value={inData.age} onChange={getInputData} className='form-control border-primary' placeholder='Age' />
          </div>
          <div className='my-3 col-md-6' >
            <label className="form-check-label me-2 text-primary fs-5">Gender : </label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" value="male" onChange={getInputData} id="inlineRadio1" />
              <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" value="female" onChange={getInputData} id="inlineRadio2" />
              <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" value="other" onChange={getInputData} id="inlineRadio3" />
              <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
            </div>
          </div>
        </section>
        <section className='container row'>
          <div className='my-2 col-md-12'>
            <textarea name="address" value={inData.address} onChange={getInputData} className='form-control border-primary p-5' placeholder='Address' ></textarea>
          </div>
        </section>
        <section className='container row'>
          <div className='d-grid my-2'>
            <button type='submit' className='btn btn-outline-primary btn-lg'>Update</button>
          </div>
        </section>
      </form>
    </>
  )
}

export default UpdateEmp
