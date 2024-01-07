// client/src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import { IoPersonAddOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import img1 from '../images/img1.svg';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    // Fetch employees from the Glitch-hosted server
    fetch('https://emp-mgt.glitch.me/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setShowEditForm(true);
  };

  const handleDeleteClick = (id) => {
    // Delete employee from the Glitch-hosted server
    fetch(`https://emp-mgt.glitch.me/api/employees/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update UI after successful deletion
        setEmployees(employees.filter((employee) => employee.id !== id));
      })
      .catch((error) => console.error('Error deleting employee:', error));
  };

  const handleAddEmployee = (newEmployee) => {
    // Add employee to the Glitch-hosted server
    fetch('https://emp-mgt.glitch.me/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI after successful addition
        setEmployees([...employees, data]);
        setShowAddForm(false);
      })
      .catch((error) => console.error('Error adding employee:', error));
  };

  const handleEditEmployee = (updatedEmployee) => {
    // Update employee on the Glitch-hosted server
    fetch(`https://emp-mgt.glitch.me/api/employees/${updatedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI after successful edit
        setEmployees(
          employees.map((employee) =>
            employee.id === data.id ? data : employee
          )
        );
        setEditEmployee(null);
        setShowEditForm(false);
      })
      .catch((error) => console.error('Error updating employee:', error));
  };

  return (
    <div>
      <div className='top-div'>
        <h1>Employee Management</h1>
        <button onClick={handleAddClick}><IoPersonAddOutline className='add-icon' />Add New Employee</button>
      </div>
      <h1>Employee List</h1>
      {employees.length === 0 ? (
        <div className='centre'>
          <img src={img1} alt="No employees" />
          <h4>Add Some Employees To Show The Data</h4>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Salary</th>
              <th>Joining Date</th>
              <th>Relieving Date</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.dob}</td>
                <td>{employee.salary}</td>
                <td>{employee.joiningDate}</td>
                <td>{employee.relievingDate}</td>
                <td>{employee.contact}</td>
                <td>{employee.status}</td>
                <td>
                  <button onClick={() => handleEditClick(employee)} className='edit-btn'><FaEdit className='btns'/></button>
                  <button onClick={() => handleDeleteClick(employee.id)} className='delete-btn'>
                    <MdDeleteOutline className='btns'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showAddForm && (
        <AddEmployee onAdd={handleAddEmployee} onCancel={() => setShowAddForm(false)} />
      )}
      {showEditForm && (
        <EditEmployee
          employee={editEmployee}
          onEdit={handleEditEmployee}
          onCancel={() => setShowEditForm(false)}
        />
      )}
    </div>
  );
};

export default EmployeeList;
