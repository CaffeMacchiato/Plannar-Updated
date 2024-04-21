function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
  function saveFormData(event) {
    event.preventDefault();  // Prevent the form from submitting normally
  
    // Get values from the form
    var semester = document.getElementById('classname').value;
    var year = document.getElementById('year').value;
    var endGoal = document.getElementById('endgoal').value;
  
    // Create a new div to display the information
    var newEntry = document.createElement('div');
    newEntry.innerHTML = `<strong>Semester:</strong> ${semester}, <strong>Year:</strong> ${year}, <strong>End Goal:</strong> ${endGoal}`;
  
    // Append the new entry to the desired-content div
    document.getElementById('grade-entries').appendChild(newEntry);
  
    // Close popup after saving data
    closePopup();
  }
  
function updateAddClassButton() {
    // Get the value from the totalClasses input field
    const totalClasses = document.getElementById('totalClasses').value;

    // Get the "Add Class" button
    const addClassButton = document.getElementById('addClass');

    // Enable the "Add Class" button only if totalClasses is a positive integer
    if (totalClasses && totalClasses > 0) {
        addClassButton.disabled = false;
    } else {
        addClassButton.disabled = true;
    }
}
// Function to add class input fields within a table format
function addClassInput() {
    const totalClasses = document.getElementById('totalClasses').value;
    const classContainer = document.getElementById('class-inputs-container');
    const existingRows = classContainer.querySelectorAll('.classInput').length;

    if (existingRows >= totalClasses) {
        alert('You have reached the maximum number of classes.');
        return;
    }
    const table = classContainer.querySelector('table') || createClassInputTable();
    const row = table.insertRow(-1); // Insert a new row at the end of the table
    row.className = 'classInput';
    // Create cells for class input fields
    const cellName = row.insertCell(0);
    const cellCredits = row.insertCell(1);
    const cellGrade = row.insertCell(2);
    const cellRemove = row.insertCell(3);

    // Add input fields to the cells
    cellName.innerHTML = '<input type="text" placeholder="Class Name" required>';
    cellCredits.innerHTML = '<input type="number" placeholder="Credits" min="1" step="1" required>';
    cellGrade.innerHTML = `
        <select required>
            <option value="">Select Grade</option>
            <option value="4.0">A</option>
            <option value="3.0">B</option>
            <option value="2.0">C</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>`;
    cellRemove.innerHTML = '<button type="button" onclick="removeInput(this)">Remove Class</button>';

    // Append the table to the container if it's not already there
    if (!classContainer.querySelector('table')) {
        classContainer.appendChild(table);
    }
}

// Helper function to create the table for class inputs
function createClassInputTable() {
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Class Name</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Remove</th>
        </tr>`;
    return table;
}

// Function to remove a class input row
function removeInput(element) {
    const row = element.parentNode.parentNode; 
    row.parentNode.removeChild(row);
}

// Function to calculate the GPA
function calculateGPA() {
    event.preventDefault(); 
    const table = document.getElementById('class-inputs-container').querySelector('table');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        const credits = parseFloat(row.cells[1].querySelector('input').value);
        const grade = parseFloat(row.cells[2].querySelector('select').value);

        if (!isNaN(credits) && !isNaN(grade)) {
            totalCredits += credits;
            totalPoints += grade * credits;
        }
    }

    const semesterGpa = totalPoints / totalCredits;
    document.getElementById('semester-gpa').textContent = semesterGpa.toFixed(2);
    const pastGPA = parseFloat(document.getElementById('past-gpa').value);
    var calculatedresult = ((semesterGpa + pastGPA) / 2).toFixed(2);
    document.getElementById('predictedgpa').textContent = calculatedresult;

}

