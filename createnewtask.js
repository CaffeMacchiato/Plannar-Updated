// Create a new task box
function addTaskBox(title, time) {
    var newTaskBox = document.createElement('div');
    newTaskBox.className = 'task-box';

    var taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    var taskTitle = document.createElement('p');
    taskTitle.className = 'task-title';
    taskTitle.textContent = title;
    taskContent.appendChild(taskTitle);

    var timeslot = document.createElement('p');
    timeslot.className = 'timeslot';
    timeslot.textContent = time;
    taskContent.appendChild(timeslot);

    newTaskBox.appendChild(taskContent);

    // This creates an "Edit" button within the task textbox
    var editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-button';
    editButton.onclick = function() {
        editTask(taskTitle, timeslot);
    };
    taskContent.appendChild(editButton);

    // This creates a "Delete" button outside the task box
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        deleteTaskBox(newTaskBox);
    };
    newTaskBox.appendChild(deleteButton);

    var assignBoxes = document.querySelector('.assign-boxes');
    assignBoxes.appendChild(newTaskBox); // Add any newly created task boxes to the end of the task list

    // Move the "Create New Task" button to the very bottom of the task list
    var createTaskButton = document.getElementById('create-task-button');
    assignBoxes.appendChild(createTaskButton);
}

// Delete a task box
function deleteTaskBox(taskBox) {
    taskBox.remove();
}

// Edit an existing task (one that's already in the HTML)
function editTask(taskTitle, timeslot) {
    var newTitle = prompt("Enter new task name:", taskTitle.textContent);
    var newTime = prompt("Enter new task time:", timeslot.textContent);

    if (newTitle !== null && newTime !== null) {
        // Update task details (the title and the timeslot)
        taskTitle.textContent = newTitle;
        timeslot.textContent = newTime;
    }
}

// Create a new task using the "Create New Task" button
function createNewTask() {
    var title = prompt("Enter task name:");
    var time = prompt("Enter task time:");
    
    if (title && time) {
        addTaskBox(title, time);
    } else {
        alert("Task name and time are required.");
    }
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    var createTaskButton = document.getElementById('create-task-button');
    createTaskButton.addEventListener('click', createNewTask);

    // This adds the "Delete" button functionality to EXISTING task boxes
    var deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var taskBox = button.parentElement;
            deleteTaskBox(taskBox);
        });
    });

    // This adds the "Edit" button functionality to EXISTING and NEWLY CREATED task boxes
    var editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var taskContent = button.parentElement;
            var taskTitle = taskContent.querySelector('.task-title');
            var timeslot = taskContent.querySelector('.timeslot');
            editTask(taskTitle, timeslot);
        });
    });
});
