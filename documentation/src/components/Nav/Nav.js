import React from 'react';
import { useLocation } from '@reach/router';

import styles from './Nav.module.scss';
import {Category, CategoryLink} from './Category';

const Nav = () => {
  const location = useLocation();


  return (
    <aside className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul className={styles.navGroup}>
          <li className={styles.navItem}>
            <h2>Design System Starter</h2>
          </li>
          <li className={styles.navItem}>
            <Category
              label="Components"
              defaultOpen={location.pathname.startsWith('/components')}
              >
              <CategoryLink key={1} to={'/components/badge'}>
                badge
              </CategoryLink>
            </Category>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Nav;