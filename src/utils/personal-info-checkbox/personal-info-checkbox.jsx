import React from 'react';
import PropTypes from 'prop-types';
import styles from './personal-info-checkbox.module.scss';

const PersonalInfoCheckbox = React.forwardRef((props, ref) => {
  const { children, name, id, errorMessage } = props;
  return (
    <div className={styles.personalInfoCheckbox}>
      <div className={styles.container}>
        <input 
          className={styles.checkbox} 
          id={id} 
          type="checkbox" 
          name={name} 
          defaultChecked 
          ref={ref}
        />
        <label className={styles.label} htmlFor={id}>
          {children}
        </label>
      </div>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
})

PersonalInfoCheckbox.defaultProps = {
  children: '',
  errorMessage: '',
};

PersonalInfoCheckbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default PersonalInfoCheckbox;
