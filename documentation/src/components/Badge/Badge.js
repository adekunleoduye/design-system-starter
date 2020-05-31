import React from 'react'
// import PropTypes from 'prop-types';
// import './Badge.scss';


const Badge = ({children, type="default"}) => {
  return <span className={`badge badge--${type}`}>{children}</span>;
};

// Badge.propTypes = {
//   type: PropTypes.oneOf(['error','caution','info','default']),
// };

export default Badge;

