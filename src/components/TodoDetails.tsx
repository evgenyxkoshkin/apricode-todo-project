import React, { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react-lite';

import styles from '../style/todos.module.scss';
import todos from '../store/todos';
import editIcon from '../assets/icons/edit.svg'; 
import EditModalWindow from './ui/EditModalWindow';

const TodoDetails: FunctionComponent = observer(() => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  return (
    <>
      {todos.activeTask && (
        <div className={styles.todoDetails}>
          <div className={styles.todoItem}>
            <h2 className='bigHeader'>Task Info</h2>
            <img
              src={editIcon}
              alt='Edit task'
              className={styles.icons}
              onClick={handleEditClick}
            />
          </div>
          <h3 className='midHeader'>{todos.activeTask.title}</h3>
          <p>{todos.activeTask.text}</p>

          {isEditing && (
            <EditModalWindow
              taskId={todos.activeTask.id}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </>
  );
});

export default TodoDetails;
