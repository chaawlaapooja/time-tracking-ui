
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const FETCH_TASK='FETCH_TASK';
export const UPDATE_TIME='UPDATE_TIME';
export const REMOVE_TASK = 'REMOVE_TASK';

export const addTask = (name, tags) => {
  return async dispatch => {
    const response = await fetch(
      'https://time-tracking-server.herokuapp.com/performActions',{
        method:'POST',
        body: JSON.stringify({name,tags,action:'add'}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const taskData = await response.json();
    try {
      dispatch({
        type: ADD_TASK,
        taskData
      });
    } catch (err) {
      throw err;
    }
    if(taskData==='error')
      return 'error'
    else
      return 'success'
  };
};
export const updateTask = (name, tags, _id) => {
  return async dispatch => {
    const response = await fetch(
      'https://time-tracking-server.herokuapp.com/performActions',{
        method:'POST',
        body: JSON.stringify({name,tags,_id,action:'update'}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const taskData = await response.json();
    if (taskData==='error') {
      throw new Error('Something went wrong!');
    }
    try {
      dispatch({
        type: UPDATE_TASK,
        name,
        tags,
        _id
      });
    } catch (err) {
      throw err;
    }
    if(taskData==='error')
      return 'error'
    else
      return 'success'
  };
};
export const fetchTasks = () => {
  return async dispatch=>{
    try{
        var response = await fetch('https://time-tracking-server.herokuapp.com/fetchTasks',{
            method:'GET'
        })
        response = await response.json()
   
        dispatch({
          type : FETCH_TASK,
          response
        })
    }
    catch(err){
      throw err;
    }
  }
}
export const removeTask = (_id) => {
  return async dispatch => {
    try {
      var response = await fetch('https://time-tracking-server.herokuapp.com/performActions',{
      method:'POST',
      body: JSON.stringify({_id: _id, action : 'deleteTask'}),
      headers: {
          'Content-Type': 'application/json'
      }
      })
      response = await response.json()
      dispatch({
          type:REMOVE_TASK,
          _id
      })
    }
    catch(err){
        throw err
    }
    if(response==='error')
      return 'error'
    else
      return 'success'
  }
}
export const updateTime = (_id, action, timeStamp) => {
  return async dispatch => {
    try{
      var response = await fetch('https://time-tracking-server.herokuapp.com/performActions',{
        method:'POST',
        body: JSON.stringify({_id: _id, action : action, timeStamp:timeStamp}),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      response = response.json()
      dispatch({
        type:UPDATE_TIME,
        _id,
        action,
        timeStamp
      })
    }
    catch(err){
        throw err
    }
    if(response==='error')
      return 'error'
    else
      return 'success'
  } 
}