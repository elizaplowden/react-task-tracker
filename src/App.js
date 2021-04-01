// hook
import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

// could also be a class
const App = () => {
  // toggle form
  // form is dependent on this piece of state
  const [showAddTask, setShowAddTask] = useState(false)
  // tasks variable is still used in map, but now part of component's state
  // use setTasks to change any part of the state
  // now app level state - can be used in other components
  const [tasks, setTasks] = useState([
  {
    id: 1,
    text: 'Doctors Appointment',
    day: 'Feb 5th at 2.30pm',
    reminder: true,
  },
  {
    id: 2,
    text: 'Meeting',
    day: 'Feb 6th at 1.30pm',
    reminder: true,
  },
  {
    id: 3,
    text: 'Food Shopping',
    day: 'Feb 5th at 2.30pm',
    reminder: false,
  },
])

  // add task
  const addTask = (task) => {
    // we want to add an ID because we have no backend
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    // copy current tasks and add new task onto it
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = (id) => {
    // sets the tasks to the filtered tasks
    // can delete one
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id
      // we only want to change the one we're dealing with
      ? {...task, reminder: !task.reminder } : task))
  }

  // jsx
  return (
    // you can only return a single parent element
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
{/*      <AddTask onAdd={addTask} />*/}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask}
        onToggle={toggleReminder} />
      ) : (
        'No tasks'
      )}
    </div>
  );
}

export default App;
