import React, { useEffect, useState } from 'react'
import "./TotalEmpList.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TotalEmpList() {
  let [datas, setDatas] = useState([])
  let fetchApiData = async () => {
    try {
      let { data } = await axios.get("http://localhost:3000/employeedb");
      setDatas(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchApiData()
  }, [])
  let naviga = useNavigate();
  let getDetails = (id) => {
    naviga("/employee")
  }
  let updateData = (id) => {
    localStorage.setItem("empId", id)
    naviga("/updateEmp")
  }
  let deletEmployee = async (id) => {
    let deleded = await axios.delete(`http://localhost:3000/employeedb/${id}`);
    // console.log(deleded)
    fetchApiData()
  }
  return (
    <section style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
      {datas.map(({ id, firstName, lastName, email, gender, age }) => {
        return <div key={id} className="card m-3" style={{ width: "18rem" }}>
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
  )
}

export default TotalEmpList
