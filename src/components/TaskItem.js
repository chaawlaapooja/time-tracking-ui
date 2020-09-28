import React, { useState, useEffect } from 'react';
import CustomModal from './Modal';
import { useDispatch } from 'react-redux';
import * as tasksActions from '../store/actions/tasks';

const Task = (props) => {
var startTime = 0
if(props.startTime!==null)
    startTime = new Date().getTime()/1000 - new Date(props.startTime).getTime()/1000
 
  const [isModalOpenForEditting,setIsModalOpenForEditting] = useState(false)
  const [seconds, setSeconds] = useState(startTime);
  const [isActive, setIsActive] = useState(props.startTime!==null);
  const [endTime, setEndTime] = useState(null);

  const dispatch = useDispatch();
  
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

    const startTimer = () => {
        setIsActive(!isActive)
        dispatch(tasksActions.updateTime(props._id, 'updateStartTime',new Date())).then(callback)
    }
    const stopTimer = () => {
        dispatch(tasksActions.fetchTasks())
        setEndTime(new Date())
        setIsActive(false)
        dispatch(tasksActions.updateTime(props._id, 'updateEndTime',new Date())).then(callback)
    }
    const callback = (response) => {
        if(response==='error'){
           alert('Some error occured! Try again')
       }
    }
    const removeTask = () =>{
        dispatch(tasksActions.removeTask(props._id)).then(callback)
    }
    const convertSecondstoTime = (given_seconds) => { 
        var dateObj = new Date(given_seconds*1000),
        hours = dateObj.getUTCHours(),
        minutes = dateObj.getUTCMinutes(),
        seconds = dateObj.getSeconds(); 

        var timeString = hours.toString().padStart(2, '0') 
            + ':' + minutes.toString().padStart(2, '0') 
            + ':' + seconds.toString().padStart(2, '0'); 
        return timeString
    }
 
    const close_modal = () => {
        setIsModalOpenForEditting(false)
    }
    const getTimer = () => {
        if(endTime!==null && isActive===false)
            return new Date(props.startTime).toLocaleDateString()+' ' + new Date(props.startTime).toLocaleTimeString()+' to ' + new Date(endTime).toLocaleTimeString()+' '+convertSecondstoTime(new Date(endTime).getTime()/1000-new Date(props.startTime).getTime()/1000)
        if(props.startTime!==null && props.endTime!==null)
            return  new Date(props.startTime).toLocaleDateString()+' ' + new Date(props.startTime).toLocaleTimeString()+' to ' + new Date(props.endTime).toLocaleTimeString()+' '+convertSecondstoTime(new Date(props.endTime).getTime()/1000-new Date(props.startTime).getTime()/1000)
        else
            return convertSecondstoTime(seconds)
    }
    return (
      <div className="item" key={props._id}>
        <h2 style={{ marginTop:0+"px"}}>{props.name}</h2>
        {props.tags.map(tag=><button key={tag} className='button button--pill'>{tag}</button>)}
        <span style={{float:'right', padding:'1rem'}}>
            {getTimer()}
        </span>
        <br/>
        <button className={props.startTime===null?"button":"button disabled-button"} onClick={startTimer} disabled={props.startTime!==null}>
          Start
        </button>
        <button className={props.startTime!==null?"button":"button disabled-button"} onClick={stopTimer} disabled={props.endTime!==null}>
          Stop
        </button>
        <button className="button" onClick={()=>setIsModalOpenForEditting(true)}>
          Edit
        </button>
        <button className="button" onClick={removeTask}>
          Delete
        </button>
        {isModalOpenForEditting?<CustomModal close_modal={close_modal} purpose='edit' _id={props._id} name={props.name} tags={props.tags} />:undefined}
        
      </div>
    );
  
};

export default Task