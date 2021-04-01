import { useState } from 'react'

// taking in a prop onAdd
const AddTask = ({ onAdd }) => {
  // udpate the state of text - default
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()

    // validation. If text is not there
    if(!text) {
      alert('Please add a task')
      return
    }
    // pass in an object with the text, day, reminder
    onAdd({ text, day, reminder })
    // return
    setText('')
    setDay('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text"
        placholder="Add Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and Time</label>
        <input type="text"
        placholder="Add Day and Time"
        value={day}
        onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>

     <input type="submit" value="Save Task"
     className='btn btn-block' />
    </form>
  )
}

export default AddTask
