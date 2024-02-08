// app.js

document.addEventListener('DOMContentLoaded', () => {
  const dataList = document.getElementById('data-list');
  const dataForm = document.getElementById('data-form');
  const inputName = document.getElementById('inputName');
  const inputCondition = document.getElementById('inputCondition');
  

  // Fetch data from the new API endpoint
  const fetchData = () => {
    fetch('http://localhost:3000/api/patients')
      .then(response => response.json())
      .then(data => {
        // Display data in the list
        dataList.innerHTML = '<h2>List of Patients</h2>';
        data.forEach(patient => {
          dataList.innerHTML += `<p>${patient.name} - ${patient.condition}</p>`;
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  fetchData(); // Initial fetch when the page loads

  // Handle form submission
  dataForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newPatientName = inputName.value;
    const newPatientCondition = inputCondition.value;

    // Send data via POST request
    fetch('http://localhost:3000/api/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newPatientName, condition: newPatientCondition }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log('Data sent successfully:', responseData);
        // Fetch updated data and refresh the list
        fetchData();
      })
      .catch(error => console.error('Error sending data:', error));

    // Clear the input fields
    inputName.value = '';
    inputCondition.value = '';
  });
});
