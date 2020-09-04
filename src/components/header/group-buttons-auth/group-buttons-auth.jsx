import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserDataWithAvatar from '../../../subcomponents/user-data-with-avatar';
import styles from './group-buttons-auth.module.scss';

function GroupButtonsAuth({ user, logOutingWithDispatch }) {
  return (
    <>
      <Link to="/" className={styles.create}>
        Create article
      </Link>

      <Link to="/profile" className={styles.indent}>
        <UserDataWithAvatar username={user.username} imageSrc={user.image || undefined} />
      </Link>

      <Link to="/" className={styles.logOut} onClick={logOutingWithDispatch}>
        Log Out
      </Link>
    </>
  );
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
};

export default GroupButtonsAuth;