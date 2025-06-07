let categoryList = document.getElementById("categoryList");

// Load categories and tasks
function loadTasks() {
  categoryList.innerHTML = localStorage.getItem("tasks") || "";

  // Re-attach Sortables to each task list
  categoryList.querySelectorAll(".taskList").forEach(taskList => {
    new Sortable(taskList, {
      animation: 150,
      onEnd: saveTasks
    });
  });
}

// Save categories and tasks
function saveTasks() {
  localStorage.setItem("tasks", categoryList.innerHTML);
}

// Add new project category
function addCategory() {
  let categoryInput = document.getElementById("categoryInput");
  let categoryText = categoryInput.value.trim();
  if (categoryText === "") return;

  let li = document.createElement("li");
  li.innerHTML = `
    <h3>${categoryText}</h3>
    <div class="add-task">
      <input type="text" placeholder="Add new task...">
      <button onclick="addTask(this)">➕ Add Task</button>
      <button onclick="deleteCategory(this)">🗑️</button>
    </div>
    <ul class="taskList"></ul>
  `;

  categoryList.appendChild(li);
  categoryInput.value = "";

  // Attach Sortable to this new task list
  let taskList = li.querySelector(".taskList");
  new Sortable(taskList, {
    animation: 150,
    onEnd: saveTasks
  });

  saveTasks();
}

// Add task to a specific project
function addTask(button) {
  let container = button.closest("li");
  let taskInput = container.querySelector(".add-task input");
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let taskList = container.querySelector(".taskList");

  let li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="actions">
      <button onclick="completeTask(this)">✅</button>
      <button onclick="reopenTask(this)">🔄</button>
      <button onclick="deleteTask(this)">🗑️</button>
    </div>
  `;

  taskList.appendChild(li);
  taskInput.value = "";
  saveTasks();
}

// Mark task as completed
function completeTask(button) {
  button.closest("li").classList.add("completed");
  saveTasks();
}

// Reopen a completed task
function reopenTask(button) {
  button.closest("li").classList.remove("completed");
  saveTasks();
}

// Delete a task
function deleteTask(button) {
  button.closest("li").remove();
  saveTasks();
}

// Delete a Category
function deleteCategory(button) {
  button.closest("li").remove();
  saveTasks();
}

// Delete All
function resetAll() {
  categoryList.innerHTML = "";
  saveTasks();
}

// On page load, load saved data
loadTasks();