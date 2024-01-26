import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-danger text-light">
                <div className="container-fluid">
                    <div className="navbar-brand text-light fw-bold">EmployeeCRUD</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="navOption" aria-current="page" to="/">Employee List</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="navOption" to="/createEmp">Add Employee</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
