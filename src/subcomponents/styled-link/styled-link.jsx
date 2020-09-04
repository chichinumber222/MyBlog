import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function StyledLink({ children, className, to, isActive }) {
  if (isActive) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return <span className={className}>{children}</span>;
}

StyledLink.defaultProps = {
  className: '',
};

StyledLink.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default StyledLink;
