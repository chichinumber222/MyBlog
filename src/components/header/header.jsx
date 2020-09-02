import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserDataWithAvatar from '../../utils/user-data-with-avatar';
import styles from './header.module.scss';

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
  )
}

function GroupButtonsAuth({user, logOutingWithDispatch}) {
  return (
    <>
      <Link to="/" className={styles.create}>
        Create article
      </Link>

      <Link to='/profile' className={styles.indent}>
        <UserDataWithAvatar 
          username={user.username} 
          imageSrc={user.image || undefined} 
        />
      </Link>

      <Link to="/" className={styles.logOut} onClick={logOutingWithDispatch}>
        Log Out
      </Link>
    </>
  )
}

function Header({user, logOutingWithDispatch}) {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div>
        {user.username ? 
          <GroupButtonsAuth user={user} logOutingWithDispatch={logOutingWithDispatch} />
          :
          <GroupButtonsNonAuth />
        }
      </div>
    </div>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  logOutingWithDispatch: PropTypes.func.isRequired,
}

GroupButtonsAuth.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  logOutingWithDispatch: PropTypes.func.isRequired,
}

export default Header;