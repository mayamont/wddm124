const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const sampleData = [
  { id: 1, name: 'Patient 1', condition: 'Fever' },
  { id: 2, name: 'Patient 2', condition: 'Headache' },
  { id: 3, name: 'Patient 3', condition: 'Cough' },
  // Add more data as needed
];

// Serve static files (including HTML) from the root directory
app.use(express.static(__dirname));

// Sample route for the root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to get the list of patients
app.get('/api/patients', (req, res) => {
  res.json(sampleData);
});

// Route to receive POST data
app.post('/api/patients', (req, res) => {
  const { name, condition } = req.body;
  const newPatient = { id: sampleData.length + 1, name, condition };
  sampleData.push(newPatient);
  res.json({ message: 'Patient added successfully', newPatient });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
