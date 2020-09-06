import React from 'react';
import PropTypes from 'prop-types';
import styles from './tag-field.module.scss';

const TagField = React.forwardRef((props, ref) => {
  const { placeholder, name, onClickButton, defaultValue } = props;

  return (
    <div className={styles.tagField}>
      <input name={name} ref={ref} defaultValue={defaultValue} placeholder={placeholder} className={styles.input} />
      <button name={name} type="button" className={styles.deleteTagButton} onClick={onClickButton}>
        Delete
      </button>
    </div>
  );
});

TagField.defaultProps = {
  placeholder: '',
  defaultValue: '',
};

TagField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TagField;
