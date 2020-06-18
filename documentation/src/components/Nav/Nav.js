import React from 'react';
import { useLocation } from '@reach/router';
import {useStaticQuery, graphql, Link} from 'gatsby'

import styles from './Nav.module.scss';
import {Category, CategoryLink} from './Category';

const Nav = () => {
  const location = useLocation();
  const { allMdx  } = useStaticQuery(
    graphql`
      query {
        allMdx(
          filter: { frontmatter: { category: { eq: "component" } } }
          sort: { fields: [frontmatter___title], order: ASC }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                path
                keywords
                category
              }
            }
          }
        }
      }
    `
  )

  return (
    <aside className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul className={styles.navGroup}>
          <li className={styles.navItem}>

              <Link to='/' className={styles.name}>Design System Starter</Link>

          </li>
          <li className={styles.navItem}>
            <Category
              label="Components"
              defaultOpen={location.pathname.startsWith('/components')}
              >
              
              {allMdx.edges.map((doc, i) => {
                const title = doc.node.frontmatter.title;
                const path = doc.node.frontmatter.path;
                
                return (
                  <CategoryLink key={i} to={path}>
                    {title}
                  </CategoryLink>
                )
              })}
            </Category>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Nav;