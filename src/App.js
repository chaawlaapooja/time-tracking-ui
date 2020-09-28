import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import tasksReducer from './store/reducers/tasks';
import { Provider } from 'react-redux';
import './App.css';
import MainApp from './MainApp'
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
	tasks:tasksReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const  App = () => {
  return (
    <Provider store={store}>
      <MainApp/>
    </Provider>
  );
}

export default App;
