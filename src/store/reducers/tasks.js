import { ADD_TASK, UPDATE_TASK, FETCH_TASK, UPDATE_TIME, REMOVE_TASK } from '../actions/tasks';
import Task from '../model/task'

const initialState = {
  tasks: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case ADD_TASK:
      const task = new Task(
       action.taskData._id,
       action.taskData.name,
       action.taskData.tags,
       null,
       null,
       action.taskData.createdAt
      );
      return {
        tasks: state.tasks.concat(task)
      };
    case UPDATE_TASK:
      const updatedTaskArray = state.tasks.map(task=>{
        if(task._id===action._id)
          return {...task, name:action.name, tags:action.tags}
        else
          return task
      })
      return {
        tasks : updatedTaskArray
      }
    case FETCH_TASK :
      return {
        tasks : action.response
      }
    case REMOVE_TASK :
      const tasks = state.tasks.filter(task=>task._id!==action._id)
      return {
        tasks
      }
    case UPDATE_TIME :
      var taskArray = []
      if(action.action==='updateStartTime')
        taskArray = state.tasks.map(task=>{
          if(task._id===action._id)
            return {...task, startTime:action.timestamp}
          else
            return task
        })
      else if(action.action==='updateEndTime')
        taskArray = state.tasks.map(task=>{
          if(task._id===action._id)
            return {...task, endTime:action.timestamp}
          else
            return task
        })
      return {
        tasks : taskArray
      }
    
    default:
      return state;
  }
};