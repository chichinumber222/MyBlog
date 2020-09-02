import React from 'react';
import PropTypes from 'prop-types';
import styles from './user-data-with-avatar.module.scss';

function UserDataWithAvatar({username, date, imageSrc, className}) {
  return (
    <div className={`${styles.person} ${className}`}>
      <div className={styles.info}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <img className={styles.avatar} alt="avatar" src={imageSrc} />
    </div>
  )
}

UserDataWithAvatar.defaultProps = {
  date: '',
  className: '',
  imageSrc: 'https://i.postimg.cc/Ss7RDzhh/user.png',
}

UserDataWithAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  imageSrc: PropTypes.string,
}

export default UserDataWithAvatar;