import { FunctionComponent } from 'react';

import styles from '../../style/ui/footer.module.scss'

const Footer: FunctionComponent = () => {
  return (
    <footer className={`container ${styles.footer}`}>
      <p>Кошкин Евгений © 2024</p>
    </footer>
  );
};

export default Footer;
