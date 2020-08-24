import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div>
        <a href="#" className={styles.signIn}>
          Sign in
        </a>
        <a href="#" className={styles.signUp}>
          Sign up
        </a>
      </div>
    </div>
  );
}

export default Header;
