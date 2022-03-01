import React, {useState, useEffect} from 'react';
import Add from './components/Add/Add';
import List from './components/List/List';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('tasks') || '[]') 
    setTasks(local)
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
	
  const handleAddTd = data => {
    const newTasks = [data, ...tasks]
    setTasks(newTasks)
  }  
  const handleDelTd = id => {
    setTasks(prev => prev.filter(item => item.id !== id))
  }
  const handleCheck = id => {
    const chTasks = [...tasks]
    setTasks(chTasks.map(item => { 
      if (item.id === id) {
        item.check = !item.check
      }
      return item
    })) 
  }
  const handleFinish = id => {
	  const fTasks = [...tasks]
    setTasks(fTasks.map(item => { 
      if (item.id === id) {
        item.finish = !item.finish
      }
      return item
    }))    
  }
  const handleAllCheck = check => {
	  const chTasks = [...tasks]
    for (let i = tasks.length; i--; ) {
      check ? chTasks[i].check = true : chTasks[i].check = false
    }
    setTasks(chTasks.map(item => { 
      check ? item.check = true : item.check = false
      return item
    })) 
  }	  
  const renderList = () => {
    if (tasks.length > 0) {
      return <List taskData={tasks} allCheck={handleAllCheck} onCheck={handleCheck} onFinish={handleFinish} onDelTd={handleDelTd}/>
    }
    else {
      return <div className="NoTasks">No tasks</div>
    }
  }
  return (
    <div>	  
      <Add onAddTd={handleAddTd} />
      {renderList()}      
    </div>
  )  
}
export default App;
