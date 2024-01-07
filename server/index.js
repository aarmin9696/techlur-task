// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

let employees = [
  // Sample data
  {
    id: 1,
    name: 'John Doe',
    dob: '1990-01-01',
    salary: 50000,
    joiningDate: '2022-01-01',
    relievingDate: '',
    contact: '1234567890',
    status: 'active',
  },
];

// API to get all employees
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// API to add a new employee
app.post('/api/employees', (req, res) => {
  const newEmployee = req.body;
  newEmployee.id = employees.length + 1;
  employees.push(newEmployee);
  res.json(newEmployee);
});

// API to update an employee
app.put('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEmployee = req.body;
  employees = employees.map((employee) =>
    employee.id === id ? { ...employee, ...updatedEmployee } : employee
  );
  res.json(updatedEmployee);
});

// API to delete an employee
app.delete('/api/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  employees = employees.filter((employee) => employee.id !== id);
  res.json({ message: 'Employee deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
