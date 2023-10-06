// src/components/EmployeeList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEmployees } from "./services/employeeService";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, []);

  const handleSearch = () => {
    const filteredData = employees.filter(
      (employee) => employee.id.toString() === searchId
    );
    setFilteredEmployees(filteredData);
  };

  const handleDelete = (id) => {
    // Create a copy of the employee list without the deleted employee
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {(filteredEmployees.length > 0 ? filteredEmployees : employees).map(
        (employee) => (
          <div className="employee-card" key={employee.id}>
            <Link to={`/employee/${employee.id}`}>
              <h2>{employee.employee_name}</h2>
            </Link>
            <p>Name: ${employee.employee_name}</p>
            <p>Salary: ${employee.employee_salary}</p>
            <p>Age: {employee.employee_age} years</p>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
            <button>Edit</button>
          </div>
        )
      )}
    </div>
  );
}

export default EmployeeList;
