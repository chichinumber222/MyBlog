import React from 'react';
import PropTypes from 'prop-types';
import styles from './custom-form-field.module.scss';

function CustomFormField({ children, onChange, placeholder, name, type, refAttribute, error }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{children}</p>
      <input
        className={error ? styles.inputError : styles.input}
        type={type}
        name={name}
        ref={refAttribute}
        onChange={onChange}
        placeholder={placeholder}
      />
      <span className={styles.error}>{error}</span>
    </div>
  );
}

CustomFormField.defaultProps = {
  children: '',
  placeholder: 'Enter',
  type: 'text',
};

CustomFormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default CustomFormField;
