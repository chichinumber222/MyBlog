import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './tag-field.module.scss';

const TagField = React.forwardRef((props, ref) => {
  const { placeholder, name } = props;
  const [isActive, setActive] = useState(true);

  return (
    <>
     {isActive && <div className={styles.tagField}>
        <input 
          name={name} 
          ref={ref} 
          placeholder={placeholder} 
          className={styles.input}
        />
        <button 
          type="button" 
          className={styles.deleteTagButton} 
          onClick={() => setActive(false)}
        >
          Delete
        </button>
      </div>}
    </>
  )
})

TagField.defaultProps = {
  placeholder: '',
}

TagField.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
}

export default TagField;