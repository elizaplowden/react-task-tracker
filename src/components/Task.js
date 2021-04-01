import { FaTimes } from 'react-icons/fa'

// catch prop in brackets
const Task = ({ task, onDelete, onToggle }) => {
  return (
    // task comes down from state and we check the reminder
    <div className={`task ${task.reminder ? 'reminder' : ''}`}
    onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text} <FaTimes
      style={{ color: 'red', cursor: 'pointer' }}
      onClick={() => onDelete(task.id)}
      />
      </h3>
      <p>{task.day}</p>
    </div>
    )
}

export default Task
