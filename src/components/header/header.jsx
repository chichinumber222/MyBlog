import React from 'react';
import styles from './header.module.scss';

function Header() {
  return (
    <div className={styles.header}>
      <span className={styles.title}>Realworld Blog</span>
      <div>
        <a href='#' className={styles.signIn}>Sign in</a>
        <a href='#' className={styles.signUp}>Sign up</a>
      </div>
    </div>
  )
}

export default Header;