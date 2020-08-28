import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserDataWithAvatar from '../../utils/user-data-with-avatar';
import styles from './header.module.scss';

function Header({user}) {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div>
        {user.username ? 
          <>
            <Link className={styles.create}>
              Create article
            </Link>
            <UserDataWithAvatar username={user.username} imageSrc={user.image} className={styles.indent}/>
            <Link className={styles.logOut}>
              Log Out
            </Link>
          </>
          :
          <>
            <Link to="/sign-in" className={styles.signIn}>
            Sign in
            </Link>
            <Link to="/sign-up" className={styles.signUp}>
              Sign up
            </Link>
          </>
        }
      </div>
    </div>
  );
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object.isRequired,
}

export default Header;
