import React from 'react';

import TasksList from './components/TasksList';
import PrivateHeader from './components/PrivateHeader';
import AddTask from './components/AddTask';

export default () => {
  return (
    <div>
      <PrivateHeader title="Task time tracking app"/>
      <div className="page-content">
        <AddTask/>
        <TasksList/>
      </div>
    </div>
  );
};