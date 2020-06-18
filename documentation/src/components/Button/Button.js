import React from 'react'
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Button.scss';

/**
 * General component description.
 */
const Button = ({children, type="primary", size="small", disabled=false, fluid=false}) => {
  return <button 
          type="button" 
          className={cx(`btn`, {
              [`btn-${type}`]: type,
              [`btn--${disabled}`]: disabled,
              [`btn-${fluid}`]: fluid,
              [`btn-${size}`]: size,
            })}>
          {children}
        </button>;
};

Button.propTypes = {
  /** Description of prop type. */
  type: PropTypes.oneOf(['primary','secondary','link','danger']),
  /** Description of prop type. */
  size: PropTypes.oneOf(['small','large']),
  /** Description of disabled type. */
  disabled: PropTypes.bool,
  /** Description of fluid type. */
  fluid: PropTypes.bool,
  /** Description of prop children. */
  children: PropTypes.node,
};

export default Button
