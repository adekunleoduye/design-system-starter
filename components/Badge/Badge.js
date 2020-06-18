import React from 'react'
import PropTypes from 'prop-types';
import './Badge.scss';

/**
 * General component description.
 */
const Badge = ({children, type="default"}) => {
  return <span className={`badge badge--${type}`}>{children}</span>;
};

Badge.propTypes = {
  /** Description of prop type. */
  type: PropTypes.oneOf(['error','caution','info','default']),
  /** Description of prop children. */
  children: PropTypes.node.isRequired,
};

export default Badge
