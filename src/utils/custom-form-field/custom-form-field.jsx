import React from 'react';
import PropTypes from 'prop-types';
import styles from './custom-form-field.module.scss';

const CustomFormField = React.forwardRef((props, ref) => {
  const { children, onChange, placeholder, name, type, id, errorMessage } = props;
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>
        {children}
      </label>
      <input
        className={errorMessage ? styles.inputError : styles.input}
        id={id}
        type={type}
        name={name}
        ref={ref}
        onChange={onChange}
        placeholder={placeholder}
      />
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
});

CustomFormField.defaultProps = {
  children: '',
  placeholder: 'Enter',
  type: 'text',
  errorMessage: '',
};

CustomFormField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default CustomFormField;
