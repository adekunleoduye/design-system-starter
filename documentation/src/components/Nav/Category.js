import React, { useState } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { IoIosArrowForward } from "react-icons/io";
import styles from './Category.module.scss'

const CategoryContext = React.createContext();

const Category = ({ children, label, id, defaultOpen = false, ...rest }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <CategoryContext.Provider
      value={{
        isOpen,
        label,
      }}
    >
      <ul
        className={cx(styles.root, {[styles.isOpen]: isOpen})}
        // className={`navSecondary-category ${isOpen ? 'is-open' : ''}`}
        id={id}
        {...rest}
      >
        <li className={styles.categoryItem} >
          {label && (
            <button
              type="button"
              className={styles.button}
              aria-expanded={isOpen}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <span className={styles.label}>{label}</span>
              <span className={styles.icon}>
                <IoIosArrowForward/>
              </span>
            </button>
          )}
          <ul className={styles.linkGroup} hidden={!isOpen}>
            {children}
          </ul>
        </li>
      </ul>
    </CategoryContext.Provider>
  );
};

const CategoryLink = ({ children, to }) => {
  const activeStyles = cx(styles.categoryLink, styles.isActive);

  return (
    <li className={styles.linkItem}>
      <Link
        to={to}
        className={styles.categoryLink}
        getProps={({ isCurrent }) => {
          // This checks if the location.pathname matches with to={to}
          if (isCurrent) {
            // Set activeStyles for link
            return { className: activeStyles };
          }
        }}
      >
        {children}
      </Link>
    </li>
  );
};

Category.propTypes = {
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
};

CategoryLink.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
};

export { Category, CategoryLink };