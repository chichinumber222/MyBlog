import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GroupButtonsNonAuth from './group-buttons-non-auth';
import GroupButtonsAuth from './group-buttons-auth';
import styles from './header.module.scss';

function Header({ user, logOutingWithDispatch }) {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div>
        {user.username ? (
          <GroupButtonsAuth user={user} logOutingWithDispatch={logOutingWithDispatch} />
        ) : (
          <GroupButtonsNonAuth />
        )}
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
};

export default Header;
