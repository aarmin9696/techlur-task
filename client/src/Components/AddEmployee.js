// client/src/components/AddEmployee.js
import React, { useState } from 'react';
import CustomModal from './Modal';

const AddEmployee = ({ onAdd, onCancel }) => {
  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    salary: '',
    joiningDate: '',
    relievingDate: '',
    contact: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(employee);
    onCancel(); 
  };

  return (
    <div>
        <CustomModal title="Add New Employee" isOpen={true} onClose={onCancel}>
      
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={employee.name} onChange={handleChange} required />
        </label>
        <label>
          DOB:
          <input type="date" name="dob" value={employee.dob} onChange={handleChange} />
        </label>
        <label>
          Salary:
          <input type="number" name="salary" value={employee.salary} onChange={handleChange} />
        </label>
        <label>
          Joining Date:
          <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} />
        </label>
        <label>
          Relieving Date:
          <input type="date" name="relievingDate" value={employee.relievingDate} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={employee.contact} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={employee.status} onChange={handleChange}>
            <option value="" disabled>Please select</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <button type="submit">Add Employee</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      </CustomModal>
    </div>
  );
};

export default AddEmployee;
