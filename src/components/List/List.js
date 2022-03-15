import React, {useContext} from 'react'
import './List.css'
import PropTypes from 'prop-types'
import {Context} from '../../context'

function List(props) {

  const {handleCheck, handleAllCheck, handleFinish, handleDelTd} = useContext(Context)

  const renderButtons = () => {
    let btn = null
    if (props.taskData.length > 0) {
      return <div><button onClick={() => handleAllCheck(true)}>Выбрать все</button><button style={{display: isChecked()}} onClick={() => handleAllCheck(false)}>Снять выделение</button></div>
    }
    return btn 
  }
  const changeAllTasks = () => {
    for (let i = (props.taskData).length; i--; ) {
      if ((props.taskData)[i].check) {
        handleFinish(props.taskData[i].id)
      }
    }		
  }
  const dellAllTasks = () => {
    for (let i = (props.taskData).length; i--; ) {
      if ((props.taskData)[i].check) {
	      handleDelTd(props.taskData[i].id)
	    }
    }
  }
  const isChecked = () => {
    let show = 'none'
    for (let i = (props.taskData).length; i--; ) {
      if (props.taskData[i].check) { show = 'inline-block'}		
    } 
    return show	
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
                <input type="checkbox" id={item.id} onChange={() => handleCheck(item.id)} checked={chk}/>
              </span>
              <span className={cls.join(' ')}>
                <span className="TaskItem" onClick={() => handleFinish(item.id)}>		   
                  {item.task}
                </span>			
                <span className="Del" onClick={() => handleDelTd(item.id)}>X</span>	
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
}
export default List