import React, {useState} from 'react';
import './Add.css'
import PropTypes from 'prop-types'

function Add(props) {
  const [task, setTask] = useState('');
  const handleChange = e => {  
    setTask(e.currentTarget.value)
  }
  const onAddButton = e => {
    e.preventDefault();	
    if (task) {  
      props.onAddTd({
        task,
        check: false,
        finish: false,
        id: Date.now()
      });
      setTask('')
    }
  }
  return (
    <div className="Add">
      <h2>My To Do List</h2>
        <form>
          <input
            id="task"
            type="text"
            placeholder="Title task..."
            onChange={handleChange}
            value={task}
          />
          <button className="addBtn" onClick={onAddButton}>
            Add task
          </button>
        </form>
    </div>
  );
}
Add.propTypes = {
  onAddTd: PropTypes.func.isRequired
};
export default Add