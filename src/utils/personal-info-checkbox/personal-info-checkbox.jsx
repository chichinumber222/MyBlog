import React from 'react';
import PropTypes from 'prop-types';
import styles from './personal-info-checkbox.module.scss';

function PersonalInfoCheckbox({ children, name, refAttribute, error }) {
  return (
    <div>
      <div className={styles.container}>
        <input 
          className={styles.checkbox} 
          id="to" 
          type="checkbox" 
          name={name} 
          defaultChecked 
          ref={refAttribute}
        />
        <label className={styles.label} htmlFor="to">
          {children}
        </label>
      </div>
      <span className={styles.error}>{error}</span>
    </div>
  );
}

PersonalInfoCheckbox.defaultProps = {
  children: '',
};

PersonalInfoCheckbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
};

export default PersonalInfoCheckbox;
