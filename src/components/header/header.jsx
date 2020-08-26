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
        <Link to="/sign-in" className={styles.signIn}>
          Sign in
        </Link>
        <Link to="/sign-up" className={styles.signUp}>
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Header;
