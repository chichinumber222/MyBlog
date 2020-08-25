import React from 'react';
import PropTypes from 'prop-types';
import styles from './custom-form-field.module.scss';

function CustomFormField({children, onChange, placeholder, ref }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{children}</p>
      <input className={styles.input} type='text' ref={ref} onChange={onChange} placeholder={placeholder}/>
    </div>   
  )
}

CustomFormField.defaultProps = {
  children: '',
  placeholder: 'Enter',
}

CustomFormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
}

export default CustomFormField;