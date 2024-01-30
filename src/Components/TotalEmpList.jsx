import React, { useEffect, useState } from 'react'
import "./TotalEmpList.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopUp from './PopUp';
import loadPic from "../PictureFolder/MolecularDNA.gif";

function TotalEmpList(props) {
  let [datas, setDatas] = useState([]);
  let [originalDatas, setOriginalDatas] = useState([]);
  let [toggle, setToggle] = useState(false)
  let [isLoading, setIsLoading] = useState(false);
  let fetchApiData = async () => {
    try {
      props.setProgress(30)
      let { data } = await axios.get("http://localhost:3000/employeedb");
      props.setProgress(70)
      setOriginalDatas(data);
      setDatas(data)
      setIsLoading(false)
      props.setProgress(100)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    fetchApiData()
  }, [])
  let naviga = useNavigate();
  let getDetails = (id) => {
    localStorage.setItem("empId", id)
    naviga("/employee")
  }
  let updateData = (id) => {
    localStorage.setItem("empId", id)
    naviga("/updateEmp")
  }
  let deletEmployee = async (id) => {
    let deleded = await axios.delete(`http://localhost:3000/employeedb/${id}`);
    setToggle(true)
    fetchApiData()
  }
  useEffect(() => {
    setTimeout(() => {
      setToggle(false)
    }, 2000);
  }, [toggle])
  // ^------ for shorting logic------------------------
  let shortingValue = ({ target: { value, name } }) => {
    switch (value) {
      case "oldToNew":
        return setDatas(originalDatas);
      case "newToOld":
        let temp = [...originalDatas].reverse()
        return setDatas(temp)
      case "aToZ":
        let aToZTemp = [...originalDatas].sort((a, b) => a.firstName.localeCompare(b.firstName));
        return setDatas(aToZTemp);
      case "zToA":
        let zToATemp = [...originalDatas].sort((a, b) => b.firstName.localeCompare(a.firstName));
        return setDatas(zToATemp);
      default:
        return setDatas(originalDatas);
    }
  }
  // * ------ for searching logic----------------------
  let searchInputValue = ({ target: { value } }) => {
    let temp = originalDatas.filter((val) => {
      return val.firstName.toLowerCase().includes(value.toLowerCase())
    })
    setDatas(temp)
  }
  return (
    <>
      <h2 className='homePageHeading'>Employee CRUD application</h2>
      <section className='tatalEmpList'>
        <div className='searchEmp'>
          <input type='search' onChange={searchInputValue} placeholder='Enter First Name' />
        </div>
        <div className='sortEmp'>
          <label htmlFor="sort">Sort Employee</label>
          <select name="sort" id="sort" onChange={shortingValue}>
            <option value="oldToNew" >Old to New</option>
            <option value="newToOld" >New To Old</option>
            <option value="aToZ" >A to Z</option>
            <option value="zToA" >Z to A</option>
          </select>
        </div>
      </section>
      {toggle && <PopUp bgcolor="red" msg="User Deleted" />}
      <section className='cardSectonList' >
        {isLoading && <img src={loadPic} className='laodingPic' alt="laading" />}
        {datas.map(({ id, firstName, lastName, email, gender, age }, ind) => {
          return <div key={id} className="card m-3" style={{ width: "18rem" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
              <span className="badge rounded-pill bg-danger"> {ind + 1} </span>
            </div>
            <div className="card-body">
              <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">Gender : {gender}</li>
                <li className="list-group-item">Age : {age}</li>
              </ul>
              <button className="btn btn-warning btn-sm m-2" onClick={() => { getDetails(id) }}>Details</button>
              <button className="btn btn-info btn-sm m-2" onClick={() => { updateData(id) }}>Update</button>
              <button className="btn btn-danger btn-sm m-2" onClick={() => { deletEmployee(id) }}>Delete</button>
            </div>
          </div>
        })}
      </section>
    </>
  )
}

export default TotalEmpList
