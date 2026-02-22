/**
 * Main application module for Task Manager
 * Coordinates between UI and Storage modules
 */

// App namespace
const app = {
    currentFilter: 'all',
    currentTheme: 'light',
    
    /**
     * Initialize the application
     */
    init() {
        this.loadTheme();
        this.loadTasks();
        this.setupEventListeners();
        ui.initFilterButtons();
        ui.initThemeToggle();
    },
    
    /**
     * Load theme from storage
     */
    loadTheme() {
        this.currentTheme = storage.getTheme();
        ui.applyTheme(this.currentTheme);
    },
    
    /**
     * Toggle theme between light and dark
     */
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        storage.saveTheme(this.currentTheme);
        ui.applyTheme(this.currentTheme);
    },
    
    /**
     * Load tasks from storage and render
     */
    loadTasks() {
        const tasks = storage.getTasks();
        this.filterTasks(this.currentFilter);
    },
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Task form submission
        const taskForm = document.getElementById('task-form');
        taskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskFormSubmit();
        });
    },
    
    /**
     * Handle task form submission
     */
    handleTaskFormSubmit() {
        const title = document.getElementById('task-input').value.trim();
        const date = document.getElementById('task-date').value;
        const priority = document.getElementById('task-priority').value;
        
        if (!utils.validateTaskInput(title, date)) {
            ui.showError('Please enter a valid task title and due date.');
            return;
        }
        
        const taskForm = document.getElementById('task-form');
        const editId = taskForm.dataset.editId;
        
        if (editId) {
            // Update existing task
            this.updateTask(editId, { title, dueDate: date, priority });
        } else {
            // Add new task
            const task = {
                id: utils.generateId(),
                title,
                dueDate: date,
                priority,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            if (storage.addTask(task)) {
                ui.clearForm();
                this.filterTasks(this.currentFilter);
            } else {
                ui.showError('Failed to add task. Please try again.');
            }
        }
    },
    
    /**
     * Filter tasks by type
     * @param {string} filter - Filter type ('all', 'pending', 'completed')
     */
    filterTasks(filter) {
        this.currentFilter = filter;
        const tasks = storage.getTasksByFilter(filter);
        ui.renderTasks(tasks);
        ui.updateStats(storage.getTasks());
    },
    
    /**
     * Toggle task completion status
     * @param {string} taskId - ID of the task to toggle
     */
    toggleTask(taskId) {
        if (storage.toggleTaskCompletion(taskId)) {
            this.filterTasks(this.currentFilter);
        } else {
            ui.showError('Failed to update task status.');
        }
    },
    
    /**
     * Update a task
     * @param {string} taskId - ID of the task to update
     * @param {Object} updates - Object containing updates
     */
    updateTask(taskId, updates) {
        if (storage.updateTask(taskId, updates)) {
            ui.clearForm();
            this.filterTasks(this.currentFilter);
        } else {
            ui.showError('Failed to update task.');
        }
    },
    
    /**
     * Delete a task
     * @param {string} taskId - ID of the task to delete
     */
    deleteTask(taskId) {
        if (storage.deleteTask(taskId)) {
            this.filterTasks(this.currentFilter);
        } else {
            ui.showError('Failed to delete task.');
        }
    }
};

// Make app available globally
window.app = app;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
