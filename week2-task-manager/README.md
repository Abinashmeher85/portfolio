# Task Manager

A simple and elegant task management application built with vanilla JavaScript, HTML, and CSS.

## Features

- **Add Tasks**: Create new tasks with title, due date, and priority (low, medium, high)
- **Edit Tasks**: Modify existing tasks
- **Delete Tasks**: Remove tasks you no longer need
- **Mark Complete**: Toggle task completion status
- **Filter Tasks**: View all, pending, or completed tasks
- **Task Statistics**: See total, pending, and completed task counts
- **Theme Toggle**: Switch between light and dark themes
- **Persistent Storage**: Tasks are saved in localStorage

## Project Structure

```
week2-task-manager/
├── index.html
├── css/
│   ├── style.css
│   └── theme.css
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── ui.js
│   └── utils.js
└── README.md
```

## Getting Started

1. Open `index.html` in your web browser
2. Start adding tasks using the form at the top
3. Use the filter buttons to view specific task categories
4. Click the theme toggle button to switch between light and dark modes

## How to Use

### Adding a Task
1. Enter a task title in the input field
2. Select a due date
3. Choose a priority level (Low, Medium, High)
4. Click "Add Task"

### Managing Tasks
- **Complete a task**: Click the checkmark button
- **Edit a task**: Click the pencil button, modify the details, and click "Update Task"
- **Delete a task**: Click the X button

### Filtering
- **All**: Shows all tasks
- **Pending**: Shows only tasks that are not completed
- **Completed**: Shows only completed tasks

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript (ES6+)
- localStorage for data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
