document.addEventListener('DOMContentLoaded', function () {
    const newTaskInput = document.getElementById("newTask");
    const addButton = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const btnAll = document.getElementById("btnAll");
    const btnActive = document.getElementById("btnActive");
    const btnCompleted = document.getElementById("btnCompleted");

    let tasks = loadTasks();
    let currentFilter = 'all';


    // To display alert messages
    function showMessage(message) {
        messageContainer.innerHTML = `
            <span>${message}</span>
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        `;
        messageContainer.style.display = 'block';
    }


    // Event Listener for Add Button
    addButton.addEventListener("click", function () {
        const taskData = newTaskInput.value.trim();
        if (taskData) {
            const newTaskObj = { item: taskData, completed: false };
            tasks.push(newTaskObj);
            saveTasks();
            renderTasks();
            newTaskInput.value = "";
            showMessage("Task added successfully.");
        } else {
            // alert("Please enter a task");
            showMessage("Please enter a task.");
        }
    });

    // Function to create and append a task element
    function createTaskElement(taskObj) {
        const listItem = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = taskObj.item;
        if (taskObj.completed) {
            taskText.classList.add("completed-task");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButtonStyle";

        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);

        // Event listener to toggle completion status
        taskText.addEventListener("click", function () {
            taskObj.completed = !taskObj.completed;
            saveTasks();
            renderTasks();
            showMessage(`Task marked as ${taskObj.completed ? 'completed' : 'active'}.`);
        });

        // Event Listener to handle deletion
        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(task => task !== taskObj);
            saveTasks();
            renderTasks();
            showMessage("Task deleted successfully.");
        });

        return listItem;
    }

    // Function to render tasks based on the current filter
    function renderTasks() {
        taskList.innerHTML = "";
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        filteredTasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    }

    // Event Listeners for Filter Buttons
    btnAll.addEventListener("click", function () {
        currentFilter = 'all';
        renderTasks();
    });

    btnActive.addEventListener("click", function () {
        currentFilter = 'active';
        renderTasks();
    });

    btnCompleted.addEventListener("click", function () {
        currentFilter = 'completed';
        renderTasks();
    });

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    }

    // Initial rendering
    renderTasks();
});
