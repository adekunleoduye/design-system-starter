import React from 'react'
import PropTypes from 'prop-types';
import styles from './PatternDisplay.module.scss';

/**
 * General component description.
 */
const PatternDisplay = ({children}) => {
  return <div className={styles.root}>{children}</div>;
};

PatternDisplay.propTypes = {
  children: PropTypes.node
};

export default PatternDisplay
