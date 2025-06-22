// Ensure the JavaScript runs only after the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    // Use document.getElementById to select the “Add Task” button.
    const addButton = document.getElementById('add-task-btn');
    // Select the input field where users enter tasks (id="task-input").
    const taskInput = document.getElementById('task-input');
    // Select the unordered list (id="task-list") that will display the tasks.
    const taskList = document.getElementById('task-list');

    // --- Local Storage Management Functions ---

    /**
     * Saves the current tasks from the DOM to Local Storage.
     * This function should be called whenever tasks are added or removed.
     */
    function saveTasks() {
        const tasks = [];
        // Iterate through each list item in the taskList (ul)
        taskList.querySelectorAll('li').forEach(item => {
            // Get the text content of the list item, excluding the remove button's text.
            // We get the firstChild (which is the text node) and its textContent.
            // This ensures we only save the task description itself.
            tasks.push(item.firstChild.textContent.trim());
        });
        // Serialize the array to JSON and store it in Local Storage under the key 'tasks'.
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Loads tasks from Local Storage when the page loads and populates the task list.
     */
    function loadTasks() {
        // Retrieve the stored tasks from Local Storage.
        // Use '[]' as a default if no tasks are found (localStorage.getItem might return null).
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        // Iterate over each stored task text
        storedTasks.forEach(taskText => {
            // Call addTask for each, but pass 'false' to the 'save' parameter
            // to prevent re-saving to Local Storage when tasks are just being loaded.
            createTaskElement(taskText);
        });
    }

    // --- Task Creation Function ---

    /**
     * Creates and appends a new task item to the To-Do list in the DOM.
     * @param {string} taskText - The text content of the new task.
     */
    function createTaskElement(taskText) {
        // Create a new <li> element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        // We set it directly here, but for complex items, we might append a text node or span.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn' for styling.
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button.
        // When triggered, this function will remove the <li> element (its parent) from the taskList.
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the parent listItem from the taskList
            saveTasks(); // Update Local Storage after removal
        };

        // Append the remove button to the <li> element.
        listItem.appendChild(removeButton);
        // Append the <li> to taskList.
        taskList.appendChild(listItem);
    }

    // --- Main Add Task Function ---

    /**
     * Handles the logic for adding a new task from the input field.
     * Optionally saves the task to local storage.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("").
        if (taskText === "") {
            // If it is empty, use alert to prompt the user to enter a task.
            // IMPORTANT: The instructions specified `alert`. In real apps, a custom modal is preferred.
            alert("Please enter a task!");
            return; // Exit the function if input is empty
        }

        // If taskText is not empty:
        createTaskElement(taskText); // Create the task element in the DOM

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = '';

        // Save the updated list of tasks to Local Storage.
        saveTasks();
    }

    // --- Attach Event Listeners ---

    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event
    // to allow tasks to be added by pressing the “Enter” key.
    taskInput.addEventListener('keypress', function(event) {
        // Inside this event listener, check if event.key is equal to 'Enter' before calling addTask.
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Invoke the loadTasks function when the DOM content is fully loaded.
    loadTasks();
});
