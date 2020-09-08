import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './styled-spinner.module.scss';

function StyledSpinner({title, className, isLoading}) {
  return (
    <>
      {isLoading && <div className={classNames(styles.container, className)}>
      <div className={styles.loading}/>
      <div className={styles.title}>{title}</div>
      </div>}
    </>
  )
}

StyledSpinner.defaultProps = {
  className: '',
}

StyledSpinner.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
}

export default StyledSpinner;