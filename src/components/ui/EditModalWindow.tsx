import React, { FunctionComponent, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import styles from '../../style/ui/modalWindow.module.scss';
import todos from '../../store/todos';

import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

type EditModalWindowProps = {
  taskId: string;
  onClose: () => void;
}

const EditModalWindow: FunctionComponent<EditModalWindowProps> = observer(({ taskId, onClose }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const task = todos.findTaskRecursive(todos.todoArray, taskId);
    if (task) {
      setTitle(task.title);
      setText(task.text);
    }
  }, [taskId]);

  const handleSave = () => {
    todos.updateTask(taskId, title, text);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={styles.blackout}>
      <div className={`${styles.flexColumn} ${styles.controls}`}>
        <div className={styles.flexColumn}>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Edit title...'
          />
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Edit text...'
          />
        </div>
        <Button btnText='Save' onClick={handleSave} />
        <Button btnText='Cancel' onClick={onClose} />
      </div>
    </div>,
    document.body
  );
});

export default EditModalWindow;
