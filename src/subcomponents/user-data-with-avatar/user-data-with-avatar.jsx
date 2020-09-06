import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './user-data-with-avatar.module.scss';

function UserDataWithAvatar({ username, date, imageSrc, className, showButtons, pathToEdit }) {
  return (
    <div className={styles.userDataWithAvatar}>
      <div className={classNames(styles.person, className)}>
        <div className={styles.info}>
          <span className={styles.username}>{username}</span>
          <span className={styles.date}>{date}</span>
        </div>
        <img className={styles.avatar} alt="avatar" src={imageSrc} />
      </div>
      {showButtons && <div className={styles.buttons}>
        <button className={styles.delete} type='button'>Delete</button>
        <Link to={pathToEdit} className={styles.edit} type='button'>Edit</Link>
      </div>}
    </div>
  );
}

UserDataWithAvatar.defaultProps = {
  date: '',
  className: '',
  imageSrc: 'https://i.postimg.cc/Ss7RDzhh/user.png',
  showButtons: false,
  pathToEdit: '/',
};

UserDataWithAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  imageSrc: PropTypes.string,
  showButtons: PropTypes.bool,
  pathToEdit: PropTypes.string,
};

export default UserDataWithAvatar;
