import React, { useState } from 'react';
import classes from './TaskItem.module.css';

import useHttp from '../../hooks/use-http';

const TaskItem = props => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { sendRequest: sendTaskRequest } = useHttp();

  const throughLine = () => {
    setIsClicked(!isClicked);
  };

  // console.log(props);

  let newTasks;

  const id = props.props.items.filter(item => item.text === props.children)[0]
    .id;
  const deleteTaskHandler = async () => {
    setIsDeleted(!isDeleted);
    // console.log(id);
    sendTaskRequest({
      url: `https://react-http-2f8d5-default-rtdb.firebaseio.com/tasks/${id}.json`,

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    newTasks = props.props.items
      .filter(item => item.id !== id)
      .map(item => item.text);

    console.log(newTasks);
  };

  // console.log(props.children);

  return (
    <div>
      <li
        className={classes.task}
        style={
          isClicked
            ? { textDecoration: 'line-through' }
            : { textDecoration: 'none' }
        }
      >
        {isDeleted ? newTasks : props.children}
      </li>
      {!isDeleted ? (
        <div>
          <button className={classes.button} onClick={throughLine}>
            {isClicked ? 'Undo' : 'Complete'}
          </button>
          <button className={classes.button} onClick={deleteTaskHandler}>
            Delete
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default TaskItem;
