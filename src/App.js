// hook
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import Footer from './components/Footer'
import AddTask from './components/AddTask'
import About from './components/About'

// could also be a class
const App = () => {
  // toggle form
  // form is dependent on this piece of state
  const [showAddTask, setShowAddTask] = useState(false)
  // tasks variable is still used in map, but now part of component's state
  // use setTasks to change any part of the state
  // now app level state - can be used in other components
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // async because it will return a promise
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
    // we don't have dependencies, so just pass in empty array
  }, [])

    // fetch tasks
    const fetchTasks = async () => {
    // fetch returns a promise so we want to await it
    const response = await fetch('http://localhost:5000/tasks')
    // get json data
    const data = await response.json()
    return data
    }

    const fetchTask = async (id) => {
    // fetch returns a promise so we want to await it
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    // get json data
    const data = await response.json()
    return data
    }




  // add task
  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      // post request
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    // promise so await
    const data = await response.json()
    // add new task to array
    setTasks([...tasks, data])
    // we want to add an ID because we have no backend
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // // copy current tasks and add new task onto it
    // setTasks([...tasks, newTask])

  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    // sets the tasks to the filtered tasks
    // can delete one
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder }

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await response.json()


    setTasks(
      tasks.map((task) =>
        task.id === id
      // we only want to change the one we're dealing with
      // data is the one we're getting back
      ? {...task, reminder: data.reminder } : task))
  }

  // jsx
  return (
    // you can only return a single parent element
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        />
      {/*put everything in one route*/}
        <Route
        path="/"
        exact
        render={(props) => (
            <>
              {showAddTask && <AddTask
              onAdd={addTask} />}
              {/*      <AddTask onAdd={addTask} />*/}
              {tasks.length > 0 ? (
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              'No tasks'
            )}
            </>
        )} />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router >
  );
}

export default App;
