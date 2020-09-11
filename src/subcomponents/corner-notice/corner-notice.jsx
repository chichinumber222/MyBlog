import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './corner-notice.module.scss';

function CornerNotice({ message, type, isActive }) {
  let style;
  switch (type) {
    case 'error':
      style = { border: '1px solid #FFCCC7', backgroundColor: '#FFF2F0' };
      break;
    case 'warning':
      style = { border: '1px solid #FFE58F', backgroundColor: '#FFFBE6' };
      break;
    case 'success':
      style = { border: '1px solid #B7EB8F', backgroundColor: '#F6FFED' };
      break;
    case 'info':
    default:
      style = { border: '1px solid #91D5FF', backgroundColor: '#E6F7FF' };
  }

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isActive);
    let id;
    if (isActive) {
      id = setTimeout(() => setActive(false), 3000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isActive]);

  return (
    <>
      {active && (
        <div className={styles.cornerNotice} style={style}>
          {message}
        </div>
      )}
    </>
  );
}

CornerNotice.defaultProps = {
  type: 'info',
  isActive: false,
};

CornerNotice.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  isActive: PropTypes.bool,
};

export default CornerNotice;
