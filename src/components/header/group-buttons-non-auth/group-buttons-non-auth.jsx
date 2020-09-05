import React from 'react';
import { Link } from 'react-router-dom';
import styles from './group-buttons-non-auth.module.scss';

function GroupButtonsNonAuth() {
  return (
    <>
      <Link to="/sign-in" className={styles.signIn}>
        Sign in
      </Link>

      <Link to="/sign-up" className={styles.signUp}>
        Sign up
      </Link>
    </>
  );
}

export default GroupButtonsNonAuth;
