// client/src/components/EditEmployee.js
import React, { useState, useEffect } from 'react';
import CustomModal from './Modal';

const EditEmployee = ({ employee, onEdit, onCancel }) => {
  const [editedEmployee, setEditedEmployee] = useState({ ...employee });

  useEffect(() => {
    setEditedEmployee({ ...employee });
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedEmployee);
    onCancel();
  };

  return (
    <div>
        <CustomModal title="Edit Employee" isOpen={true} onClose={onCancel}>
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={editedEmployee.name} onChange={handleChange} required />
        </label>
        <label>
          DOB:
          <input type="date" name="dob" value={editedEmployee.dob} onChange={handleChange} />
        </label>
        <label>
          Salary:
          <input type="number" name="salary" value={editedEmployee.salary} onChange={handleChange} />
        </label>
        <label>
          Joining Date:
          <input type="date" name="joiningDate" value={editedEmployee.joiningDate} onChange={handleChange} />
        </label>
        <label>
          Relieving Date:
          <input type="date" name="relievingDate" value={editedEmployee.relievingDate} onChange={handleChange} />
        </label>
        <label>
          Contact:
          <input type="text" name="contact" value={editedEmployee.contact} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={editedEmployee.status} onChange={handleChange}>
          <option value="" disabled>Please select</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          </select>
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
      </CustomModal>
    </div>
  );
};

export default EditEmployee;
