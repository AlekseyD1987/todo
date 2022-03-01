import React from 'react'
import './List.css'
import PropTypes from 'prop-types'

function List(props) {
  const renderButtons = () => {
    let btn = null
    if (props.taskData.length > 0) {
      return <div><button onClick={() => checkAllTasks(true)}>Выбрать все</button><button style={{display: isChecked()}} onClick={() => checkAllTasks(false)}>Снять выделение</button></div>
    }
    return btn 
  }
  const changeAllTasks = () => {
    for (let i = (props.taskData).length; i--; ) {
      if ((props.taskData)[i].check) {
        props.onFinish(props.taskData[i].id)
      }
    }		
  }
  const dellAllTasks = () => {
    for (let i = (props.taskData).length; i--; ) {
      if ((props.taskData)[i].check) {
	      props.onDelTd(props.taskData[i].id)
	    }
    }
  }
  const checkAllTasks = type => {	 
	  props.allCheck(type);
  } 
  const isChecked = () => {
    let show = 'none'
    for (let i = (props.taskData).length; i--; ) {
      if (props.taskData[i].check) { show = 'inline-block'}		
    } 
    return show	
  }
  const onDelButton = id => {
    props.onDelTd(id);
  }  
  const onCheckTask = id => {
    props.onCheck(id);
  }
  const changeTask = id => {
    props.onFinish(id);
  }
  return (       
		<div className="List">	
		  <div style={{display: isChecked()}}><button onClick={changeAllTasks}>Отметить выполненными</button><button onClick={dellAllTasks}>Удалить</button> </div>
			<div>{renderButtons()}</div>
      <ul>
        {props.taskData.map(item => {
          const cls = ['Task'];
          let chk;
          if (item.finish) {
            cls.push('Active') 
          }
          item.check ? chk = "checked" : chk = "" 

          return (
            <li className="Task_wrap" key={item.id}> 
              <span>
                <input type="checkbox" id={item.id} onChange={() => onCheckTask(item.id)} checked={chk}/>
              </span>
              <span className={cls.join(' ')}>
                <span className="TaskItem" onClick={() => changeTask(item.id)}>		   
                  {item.task}
                </span>			
                <span className="Del" onClick={() => onDelButton(item.id)}>X</span>	
              </span>
            </li>
          )
        })}
      </ul>
		</div>
  )	
}
List.propTypes = {
  taskData: PropTypes.array.isRequired,
  onCheck: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  onDelTd: PropTypes.func.isRequired,
  allCheck: PropTypes.func.isRequired
}
export default List