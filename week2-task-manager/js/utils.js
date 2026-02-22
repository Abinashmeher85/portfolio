/**
 * Utility functions for the Task Manager
 */

/**
 * Generate a unique ID for tasks
 * @returns {string} Unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Format a date string to a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get the current date in YYYY-MM-DD format
 * @returns {string} Current date string
 */
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Validate task input
 * @param {string} title - Task title
 * @param {string} date - Task due date
 * @returns {boolean} True if valid, false otherwise
 */
function validateTaskInput(title, date) {
    if (!title || title.trim() === '') {
        return false;
    }
    if (!date) {
        return false;
    }
    return true;
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get priority class based on priority value
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {string} CSS class for priority
 */
function getPriorityClass(priority) {
    return `priority-${priority.toLowerCase()}`;
}

/**
 * Check if a date is overdue
 * @param {string} dateString - Date string to check
 * @returns {boolean} True if overdue, false otherwise
 */
function isOverdue(dateString) {
    const taskDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return taskDate < today;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Export utility functions for use in other modules
window.utils = {
    generateId,
    formatDate,
    getCurrentDate,
    validateTaskInput,
    debounce,
    capitalize,
    getPriorityClass,
    isOverdue,
    escapeHtml
};
