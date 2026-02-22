/**
 * Storage module for Task Manager
 * Handles localStorage operations for tasks
 */

const STORAGE_KEY = 'taskManager_tasks';
const THEME_KEY = 'taskManager_theme';

/**
 * Get all tasks from localStorage
 * @returns {Array} Array of tasks
 */
function getTasks() {
    try {
        const tasks = localStorage.getItem(STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    } catch (error) {
        console.error('Error getting tasks from storage:', error);
        return [];
    }
}

/**
 * Save tasks to localStorage
 * @param {Array} tasks - Array of tasks to save
 * @returns {boolean} True if successful, false otherwise
 */
function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error('Error saving tasks to storage:', error);
        return false;
    }
}

/**
 * Add a new task
 * @param {Object} task - Task object to add
 * @returns {boolean} True if successful, false otherwise
 */
function addTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    return saveTasks(tasks);
}

/**
 * Update an existing task
 * @param {string} taskId - ID of the task to update
 * @param {Object} updatedTask - Updated task object
 * @returns {boolean} True if successful, false otherwise
 */
function updateTask(taskId, updatedTask) {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id === taskId);
    
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        return saveTasks(tasks);
    }
    return false;
}

/**
 * Delete a task
 * @param {string} taskId - ID of the task to delete
 * @returns {boolean} True if successful, false otherwise
 */
function deleteTask(taskId) {
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    
    if (filteredTasks.length !== tasks.length) {
        return saveTasks(filteredTasks);
    }
    return false;
}

/**
 * Get a single task by ID
 * @param {string} taskId - ID of the task to get
 * @returns {Object|null} Task object or null if not found
 */
function getTaskById(taskId) {
    const tasks = getTasks();
    return tasks.find(task => task.id === taskId) || null;
}

/**
 * Toggle task completion status
 * @param {string} taskId - ID of the task to toggle
 * @returns {boolean} True if successful, false otherwise
 */
function toggleTaskCompletion(taskId) {
    const tasks = getTasks();
    const index = tasks.findIndex(task => task.id === taskId);
    
    if (index !== -1) {
        tasks[index].completed = !tasks[index].completed;
        return saveTasks(tasks);
    }
    return false;
}

/**
 * Get tasks by filter
 * @param {string} filter - Filter type ('all', 'pending', 'completed')
 * @returns {Array} Filtered array of tasks
 */
function getTasksByFilter(filter) {
    const tasks = getTasks();
    
    switch (filter) {
        case 'pending':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

/**
 * Clear all tasks
 * @returns {boolean} True if successful, false otherwise
 */
function clearAllTasks() {
    return saveTasks([]);
}

/**
 * Get the current theme
 * @returns {string} Theme value ('light' or 'dark')
 */
function getTheme() {
    try {
        return localStorage.getItem(THEME_KEY) || 'light';
    } catch (error) {
        console.error('Error getting theme:', error);
        return 'light';
    }
}

/**
 * Save the theme preference
 * @param {string} theme - Theme value ('light' or 'dark')
 * @returns {boolean} True if successful, false otherwise
 */
function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
        return true;
    } catch (error) {
        console.error('Error saving theme:', error);
        return false;
    }
}

// Export storage functions for use in other modules
window.storage = {
    getTasks,
    saveTasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    toggleTaskCompletion,
    getTasksByFilter,
    clearAllTasks,
    getTheme,
    saveTheme
};
