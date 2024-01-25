import axios from "axios";
import { useEffect, useState } from "react";

function Employee() {
  let [apiData, setApiData] = useState({});
  let empId = localStorage.getItem("empId")
  let getApiData = async () => {
    try {
      let { data } = await axios.get(`http://localhost:3000/employeedb/${empId}`);
      setApiData(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getApiData();
  }, [])
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "40px" }}>
      <div className="card m-3" style={{ width: "30rem" }}>
        <div className="card-body">
          <h5 className="card-title m-lg-3">Name : {`${apiData.firstName} ${apiData.lastName}`}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Email Id : {apiData.email}</li>
            <li className="list-group-item">Gender : {apiData.gender}</li>
            <li className="list-group-item">Age : {apiData.age}</li>
            <li className="list-group-item">Mobile Number : {apiData.mobile}</li>
            <li className="list-group-item">Address : {apiData.address}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Employee
