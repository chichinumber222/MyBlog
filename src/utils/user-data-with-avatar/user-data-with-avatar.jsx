import React from 'react';
import PropTypes from 'prop-types';
import styles from './user-data-with-avatar.module.scss';

const defaultSrc = "https://static.productionready.io/images/smiley-cyrus.jpg"; 

function UserDataWithAvatar({username, date, imageSrc, className}) {
  return (
    <div className={`${styles.person} ${className}`}>
      <div className={styles.info}>
        <span className={styles.username}>{username}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <img className={styles.avatar} alt="avatar" src={imageSrc || defaultSrc} />
    </div>
  )
}

UserDataWithAvatar.defaultProps = {
  date: '',
  className: ''
}

UserDataWithAvatar.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
}

export default UserDataWithAvatar;