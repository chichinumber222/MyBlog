import React from 'react';
import PropTypes from 'prop-types';
import styles from './personal-info-checkbox.module.scss'

function PersonalInfoCheckbox({children}) {
  return (
    <div className={styles.container}>
      <input id={styles.id} type='checkbox' defaultChecked/>
      <label htmlFor={styles.id} className={styles.label} >{children}</label>
    </div>
  )
} 

PersonalInfoCheckbox.defaultProps = {
  children: '',
}

PersonalInfoCheckbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default PersonalInfoCheckbox;