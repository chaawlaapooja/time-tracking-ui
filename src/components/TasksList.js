import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as tasksActions from '../store/actions/tasks';

import Task from './TaskItem';

const TasksList =() => {
  const [searchField, setSearchField]=useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  
  const startdate = useRef(null);
  const enddate = useRef(null)

  var tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tasksActions.fetchTasks())
  }, [dispatch]);
  
  const renderLinksListItems = () => {
    if(searchField!==''){
        tasks = tasks.filter(task =>{
            return task.name.toLowerCase().includes(searchField.toLowerCase())
        })
    }
    if(startDate!==null && endDate!==null){
        tasks = tasks.filter(task=>{
            var task_date = new Date(task.createdAt).getTime(), 
            strtdate = new Date(startDate).getTime(),
            enddate = new Date(endDate).getTime()
            if(task_date<=enddate && task_date>=strtdate)
                return task
        })
    }
    if (tasks.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Tasks Found</p>
        </div>
      );
    }
    return tasks.map((task) => {
      return <Task key={task._id}  {...task}/>;
    });
  }
  const onSearchChange = e => {
      e.preventDefault()
      setSearchField(e.target.value)
  }
    const changeStartDate = e => {
        e.preventDefault()
        setStartDate(e.target.value)
    }
    const changeEndDate = e => {
        e.preventDefault()
        setEndDate(e.target.value)
    }
    const clearFilters=()=>{
        setStartDate(null)
        setEndDate(null)
        setSearchField('')
        startdate.current.value=null
        enddate.current.value=null
    }
    return (
      <div>
        <input type='text' value={searchField} placeholder='Search by name...' onChange={onSearchChange}/>
            <label>Start Date</label>
            <input type='date' ref={startdate} onChange={changeStartDate} style={{margin:'0 1rem'}}/>
            <label>End Date</label>
            <input type='date' ref={enddate} onChange={changeEndDate} style={{margin:'0 1rem'}}/>
            <button onClick={clearFilters} style={{padding:'0.5rem'}}>Clear Filters</button>
        
          {renderLinksListItems()}
        
      </div>
    );
  
};

export default TasksList