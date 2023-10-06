// src/components/EmployeeDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEmployees } from "./services/employeeService";

function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await fetchEmployees();
        const selectedEmployee = data.find((emp) => emp.id === parseInt(id));
        if (selectedEmployee) {
          setEmployee(selectedEmployee);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [id]);

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      <p>Name:{employee.employee_name}</p>
      <p>Salary: ${employee.employee_salary}</p>
      <p>Age: {employee.employee_age} years</p>
    </div>
  );
}

export default EmployeeDetails;
