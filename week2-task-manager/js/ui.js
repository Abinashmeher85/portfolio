/**
 * UI module for Task Manager
 * Handles DOM manipulation and rendering
 */

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskDate = document.getElementById('task-date');
const taskPriority = document.getElementById('task-priority');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalTasksEl = document.getElementById('total-tasks');
const pendingTasksEl = document.getElementById('pending-tasks');
const completedTasksEl = document.getElementById('completed-tasks');
const themeToggleBtn = document.getElementById('theme-toggle-btn');

let currentFilter = 'all';

/**
 * Render all tasks
 * @param {Array} tasks - Array of tasks to render
 */
function renderTasks(tasks) {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <li class="empty-state">
                <p>No tasks found. Add a new task to get started!</p>
            </li>
        `;
        return;
    }
    
    tasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

/**
 * Create a task list item element
 * @param {Object} task - Task object
 * @returns {HTMLElement} Task list item element
 */
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${utils.getPriorityClass(task.priority)} ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    
    const isOverdue = !task.completed && utils.isOverdue(task.dueDate);
    
    li.innerHTML = `
        <div class="task-info">
            <div class="task-title">${utils.escapeHtml(task.title)}</div>
            <div class="task-meta">
                <span class="task-date">${utils.formatDate(task.dueDate)}</span>
                ${isOverdue ? '<span class="overdue-badge">Overdue</span>' : ''}
                <span class="task-priority">${utils.capitalize(task.priority)}</span>
            </div>
        </div>
        <div class="task-actions">
            <button class="complete-btn" title="${task.completed ? 'Mark as pending' : 'Mark as completed'}">
                ${task.completed ? '↩' : '✓'}
            </button>
            <button class="edit-btn" title="Edit task">✎</button>
            <button class="delete-btn" title="Delete task">✕</button>
        </div>
    `;
    
    // Add event listeners
    const completeBtn = li.querySelector('.complete-btn');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    
    completeBtn.addEventListener('click', () => handleCompleteTask(task.id));
    editBtn.addEventListener('click', () => handleEditTask(task));
    deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));
    
    return li;
}

/**
 * Handle complete task button click
 * @param {string} taskId - ID of the task
 */
function handleCompleteTask(taskId) {
    if (window.app && window.app.toggleTask) {
        window.app.toggleTask(taskId);
    }
}

/**
 * Handle edit task button click
 * @param {Object} task - Task object to edit
 */
function handleEditTask(task) {
    taskInput.value = task.title;
    taskDate.value = task.dueDate;
    taskPriority.value = task.priority;
    
    // Store the task ID being edited
    taskForm.dataset.editId = task.id;
    
    // Change button text
    const addBtn = document.getElementById('add-task-btn');
    addBtn.textContent = 'Update Task';
    
    // Focus on input
    taskInput.focus();
}

/**
 * Handle delete task button click
 * @param {string} taskId - ID of the task to delete
 */
function handleDeleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        if (window.app && window.app.deleteTask) {
            window.app.deleteTask(taskId);
        }
    }
}

/**
 * Update task statistics
 * @param {Array} tasks - Array of tasks
 */
function updateStats(tasks) {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasksEl.textContent = total;
    pendingTasksEl.textContent = pending;
    completedTasksEl.textContent = completed;
}

/**
 * Clear the task form
 */
function clearForm() {
    taskForm.reset();
    delete taskForm.dataset.editId;
    
    const addBtn = document.getElementById('add-task-btn');
    addBtn.textContent = 'Add Task';
}

/**
 * Set active filter button
 * @param {string} filter - Filter type
 */
function setActiveFilter(filter) {
    currentFilter = filter;
    filterButtons.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * Get current filter
 * @returns {string} Current filter type
 */
function getCurrentFilter() {
    return currentFilter;
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    alert(message);
}

/**
 * Initialize filter buttons
 */
function initFilterButtons() {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setActiveFilter(filter);
            if (window.app && window.app.filterTasks) {
                window.app.filterTasks(filter);
            }
        });
    });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    themeToggleBtn.addEventListener('click', () => {
        if (window.app && window.app.toggleTheme) {
            window.app.toggleTheme();
        }
    });
}

/**
 * Apply theme to the document
 * @param {string} theme - Theme type ('light' or 'dark')
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Export UI functions
window.ui = {
    renderTasks,
    updateStats,
    clearForm,
    setActiveFilter,
    getCurrentFilter,
    showError,
    initFilterButtons,
    initThemeToggle,
    applyTheme
};
