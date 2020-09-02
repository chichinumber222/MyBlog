import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MyLink({ children, className, to, isActive }) {
  if (isActive) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return <span className={className}>{children}</span>;
}

MyLink.defaultProps = {
  className: '',
};

MyLink.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default MyLink;
