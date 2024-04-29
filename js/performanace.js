
let chart = null;


function openPopup() {
    document.getElementById('popup').style.display = 'block';
}
function openPopups() {
    document.getElementById('popups').style.display = 'block';
}
function closePopups() {
    document.getElementById('popups').style.display = 'none';
    document.getElementById('popup-contents').reset();
}
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup-content').reset();
}

function saveFormData(event) {
    event.preventDefault();  // Prevent the form from submitting normally
  
    // Get values from the form
    var semester = document.getElementById('classname').value;
    var year = document.getElementById('year').value;
    var endGoal = document.getElementById('endgoal').value;
  
    // Create a new div to display the information
    var newEntry = document.createElement('table');
    newEntry.innerHTML = 
    `
    <table>
    <tr>
            <th>Class:</th>
            <th> Year:</th>
            <th>End Goal:</th>
            <th>Actions:</th>

    </tr>
    <tr>
            <td style="padding-right: 30px;"> ${semester}</td>
            <td style="padding-right: 30px;">${year}</td>
            <td style="padding-right: 30px;">${endGoal}</td>
            <td style="padding-right: 30px;">
            <button onclick="">Edit</button>
            <button onclick="deleteEntry(this)">Delete</button>
            </td>
    </tr>
    </table>
    `;
  
    // Append the new entry to the desired-content div
    document.getElementById('grade-entries').appendChild(newEntry);
  
    // Close popup after saving data
    closePopup();
  }
  function deleteEntry(button) {
   var table = button.closest('table');
   table.innerHTML = ``;
  }
function editDesired(){
    openPopup();

}

function saveCurrent(event){
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var classes = document.getElementById('classnames').value;
    var credits = document.getElementById('Credits').value;
    var grade = document.getElementById('Grade').value;

    // Get the tbody element of the table where new rows will be added
    var tbody = document.getElementById('class-row'); //to get the body

    var newRow = tbody.insertRow(-1);// a new row will be created 

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.textContent = classes;
    cell2.textContent = credits;
    cell3.textContent = grade;
    cell4.innerHTML = '<button onclick="">Edit</button> <button onclick="removeInput(this)">Delete</button>';


    closePopups();
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
    //https://www.w3schools.com/jsref/met_table_insertrow.asp
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
//yesj
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
    //https://www.geeksforgeeks.org/html-dom-parentnode-property/
    const row = element.parentNode.parentNode; 
    row.parentNode.removeChild(row);
}

// Function to calculate the GPA
function calculateGPA() {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    event.preventDefault(); 
    const table = document.getElementById('class-inputs-container').querySelector('table');
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 1; i < table.rows.length; i++) {
        const row = table.rows[i];
        //https://www.w3schools.com/jsref/jsref_parsefloat.asp
        const credits = parseFloat(row.cells[1].querySelector('input').value);
        const grade = parseFloat(row.cells[2].querySelector('select').value);

        //https://www.w3schools.com/jsref/jsref_isnan.asp
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

function createGraph(){

  const labels = ['1month', '2month', '3month', '4month'];

            const data = {
                labels: labels,
                datasets: [{
                    label: 'GPA',
                    data: [3.2,3.25, 2.8, 3.5],
                    fill: true,
                    borderColor: 'black',
                }]
            };

            const config = {
                type: 'line',
                data: data   
            };

            chart = new Chart(
                document.getElementById('ProgressChart'),
                config
            );

            
}

function createGraphs(){

    const tableRows = document.querySelectorAll('#class-row tr');

    // Initialize arrays to store class names and grades
    const classNames = [];
    const classGrades = [];

    // Loop through each row to extract class name and grade
    tableRows.forEach(row => {
        const className = row.cells[0].textContent;
        const grade = parseFloat(row.cells[2].textContent); // Assuming grades are stored as numeric values in the table
        classNames.push(className);
        classGrades.push(grade);
    });

    // Create the graph data using the retrieved class names and grades
    const data = {
        labels: classNames,
        datasets: [{
            label: 'Grade',
            data: classGrades,
            fill: true,
            borderColor: 'black',
            backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adding a light fill under the line
        }]
    };

    // Chart configuration
    const config = {
        type: 'line',
        data: data
    };
        
               chart = new Chart(
                  document.getElementById('ProgressCharts'),
                  config
              );
  
              
  }
function resetGraphs() {
    if (chart) {
        chart.destroy();
        chart = null;
    }

}
