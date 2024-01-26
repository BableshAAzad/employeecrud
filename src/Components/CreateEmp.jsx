import axios from "axios";
import { useEffect, useState } from "react";
import "./CreateEmp.css"
import PopUp from "./PopUp";

function CreateEmp() {
    let [inputData, setInputData] = useState({ firstName: "", lastName: "", email: "", mobile: "", age: "", address: "", gender: "" });
    let [toggle, setToggle] = useState(false)
    let getInputData = ({ target: { value, name } }) => {
        setInputData({ ...inputData, [name]: value });
    }
    let sendFormData = async (e) => {
        e.preventDefault();
        try {
            let datas = await axios.post("http://localhost:3000/employeedb", inputData);
            // console.log(datas)
            setInputData({ firstName: "", lastName: "", email: "", mobile: "", age: "", address: "", gender: "" })
        } catch (error) {
            console.log(error)
        }
        setToggle(true)
    }
    useEffect(() => {
        setTimeout(() => {
            setToggle(false)
        }, 2000);
    }, [toggle])

    return (
        <>
            {toggle && <PopUp bgcolor="green" msg="User Added" />}
            <form className='addUser container col-md-12 border border-success mt-4 p-3' onSubmit={sendFormData} >
                <h1 style={{ textAlign: "center", fontWeight: "bold" }}>ADD EMPLOYEE</h1>
                <section className='container row'>
                    <div className='my-3 col-md-6'>
                        <input type="text" name="firstName" value={inputData.firstName} onChange={getInputData} className='form-control border-success' placeholder='First Name' />
                    </div>
                    <div className='my-3 col-md-6'>
                        <input type="text" name="lastName" value={inputData.lastName} onChange={getInputData} className='form-control border-success' placeholder='Last Name' />
                    </div>
                </section>
                <section className='container row'>
                    <div className='my-3 col-md-6'>
                        <input type="email" name="email" value={inputData.email} onChange={getInputData} className='form-control border-success' placeholder='Email' />
                    </div>
                    <div className='my-3 col-md-6'>
                        <input type="tel" name="mobile" value={inputData.mobile} onChange={getInputData} className='form-control border-success' placeholder='Mobile' />
                    </div>
                </section>
                <section className='container row'>
                    <div className='my-3 col-md-6'>
                        <input type="number" name="age" value={inputData.age} onChange={getInputData} className='form-control border-success' placeholder='Age' />
                    </div>
                    <div className='my-3 col-md-6' >
                        <label className="form-check-label me-2 text-success fs-5">Gender : </label>
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
                    <div className='my-3 col-md-12'>
                        <textarea name="address" value={inputData.address} onChange={getInputData} className='form-control border-success p-5' placeholder='Address' ></textarea>
                    </div>
                </section>
                <section className='container row'>
                    <div className='d-grid my-2'>
                        <button type='submit' className='btn btn-outline-success btn-lg'>Add</button>
                    </div>
                </section>
            </form>
        </>
    )
}

export default CreateEmp
