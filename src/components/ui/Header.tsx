import { FunctionComponent } from 'react';

import todopic from '../../assets/todopic.svg'
import addIcon from '../../assets/icons/add.svg';

import styles from '../../style/ui/header.module.scss';

type HeaderProps = {
  modalToggler: () => void;
}

const Header: FunctionComponent<HeaderProps> = ( {modalToggler} ) => {
  return (
    <header className={`container ${styles.header}`}>
      <img src={todopic} alt='todopic' className={styles.todopic} />
      <h1 className='largeHeader'>Todo List</h1>
      <img 
        src={addIcon} 
        onClick={modalToggler}
        alt='add todo icon' 
        className={styles.addIcon} 
        tabIndex={0}
      />
    </header>
  );
};

export default Header;
