"use client"

import { useState } from "react"
import "./Dashboard.css"

// Icons
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
)

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" />
  </svg>
)

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

export default function Dashboard({ onNavigate }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test",
      description: "This is a new task",
      dueDate: "2025-07-04",
      reminder: "2025-07-04T14:09",
      priority: "Medium",
      status: "Pending",
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    reminder: "",
    priority: "Medium",
  })

  const [isEditing, setIsEditing] = useState(null)

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    const task = {
      id: Date.now(),
      ...newTask,
      status: "Pending",
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      reminder: "",
      priority: "Medium",
    })
  }

  const handleMarkComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ""
    const date = new Date(dateTimeString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "linear-gradient(135deg, #ef4444, #dc2626)"
      case "Medium":
        return "linear-gradient(135deg, #f59e0b, #d97706)"
      case "Low":
        return "linear-gradient(135deg, #10b981, #059669)"
      default:
        return "linear-gradient(135deg, #6b7280, #4b5563)"
    }
  }

  return (
    <div className="dashboard-page">
      {/* Animated Background */}
      <div className="dashboard-bg">
        <div className="bg-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-content">
            <div className="welcome-section">
              <h1 className="dashboard-title">
                Welcome back <span className="user-name"></span>
              </h1>
              <p className="dashboard-subtitle">Manage your tasks and boost your productivity</p>
            </div>
            <button className="logout-btn" onClick={() => onNavigate("home")}>
              <LogOutIcon />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Add New Task Form */}
        <div className="task-form-card">
          <div className="card-glow"></div>
          <div className="form-header">
            <PlusIcon />
            <h2 className="form-title">Add New Task</h2>
          </div>
          <form onSubmit={handleAddTask} className="task-form">
            <div className="form-group">
              <label className="form-label">Title</label>
              <div className="input-container">
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title..."
                  className="form-input"
                  required
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description (Optional)</label>
              <div className="input-container">
                <textarea
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  placeholder="Add task description..."
                  className="form-textarea"
                  rows="3"
                />
                <div className="input-glow"></div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Due Date (Optional)</label>
                <div className="input-container">
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <div className="input-glow"></div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Reminder (Optional)</label>
                <div className="input-container">
                  <input
                    type="datetime-local"
                    name="reminder"
                    value={newTask.reminder}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <div className="input-glow"></div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <div className="input-container">
                <select name="priority" value={newTask.priority} onChange={handleInputChange} className="form-select">
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
                <div className="input-glow"></div>
              </div>
            </div>

            <button type="submit" className="add-task-btn">
              <div className="button-bg"></div>
              <div className="button-content">
                <PlusIcon />
                <span>Add Task</span>
                <div className="button-arrow">→</div>
              </div>
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="tasks-section">
          <div className="section-header">
            <h2 className="section-title">Your Tasks</h2>
            <div className="task-stats">
              <span className="stat">{tasks.filter((t) => t.status === "Pending").length} Pending</span>
              <span className="stat">{tasks.filter((t) => t.status === "Completed").length} Completed</span>
            </div>
          </div>

          <div className="tasks-grid">
            {tasks.map((task) => (
              <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
                <div className="task-card-glow"></div>
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <span className={`task-status ${task.status.toLowerCase()}`}>
                    {task.status === "Completed" && <CheckIcon />}
                    {task.status}
                  </span>
                </div>

                {task.description && <p className="task-description">{task.description}</p>}

                <div className="task-details">
                  {task.dueDate && (
                    <div className="task-detail">
                      <CalendarIcon />
                      <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                  )}

                  <div className="task-detail">
                    <div className="priority-badge" style={{ background: getPriorityColor(task.priority) }}>
                      Priority: {task.priority}
                    </div>
                  </div>

                  {task.reminder && (
                    <div className="task-detail">
                      <ClockIcon />
                      <span>Reminder: {formatDateTime(task.reminder)}</span>
                    </div>
                  )}
                </div>

                <div className="task-actions">
                  {task.status === "Pending" && (
                    <button className="action-btn complete-btn" onClick={() => handleMarkComplete(task.id)}>
                      <CheckIcon />
                      <span>Complete</span>
                    </button>
                  )}
                  <button className="action-btn edit-btn">
                    <EditIcon />
                    <span>Edit</span>
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDeleteTask(task.id)}>
                    <TrashIcon />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}

            {tasks.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">
                  <CalendarIcon />
                </div>
                <h3>No tasks yet</h3>
                <p>Create your first task to get started on your productivity journey!</p>
                <button className="empty-cta" onClick={() => document.querySelector(".form-input").focus()}>
                  <PlusIcon />
                  Add Your First Task
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
