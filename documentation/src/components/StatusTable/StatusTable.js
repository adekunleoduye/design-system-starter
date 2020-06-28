import React, {useState} from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import { removeSpaces, toTitleCase } from 'utils';


import styles from './StatusTable.module.scss';
import Badge from 'components/Badge';

import ComponentList from './componentList';

export const StatusTable = () => {
  let results = ComponentList.sort((a, b) => (a.name > b.name ? 1 : -1));

  const [searchValue, setSearchValue] = useState('');
  const [allComponents, setAllComponents] = useState(results);

  const data = useStaticQuery(
    graphql`
      {
        allMdx(
          filter: { frontmatter: { category: { eq: "component" } } }
          sort: { fields: [frontmatter___title], order: ASC }
        ) {
          edges {
            node {
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    `,
  );

  // Filter table based on input value
  const filterTable = (e) => {
    const inputValue = e.target.value;

    results = results.filter((component) => {
      return component.name.indexOf(inputValue.toLowerCase()) === 0;
    });

    setSearchValue(inputValue);
    setAllComponents(results);
  };

  // If doc is available, set url on page name
  const setComponentUrl = (componentName) => {
    const DOCS = data.allMdx.edges;

    const getComponentUrl = DOCS.filter((componentDoc) => {
      const componentDocTitle = componentDoc.node.frontmatter.title.toLowerCase();

      const isComponentDocAvailable =
        componentName.toLowerCase() === componentDocTitle;
      
      console.log({componentName,componentDocTitle});

      return isComponentDocAvailable;
    }).map((componentDoc) => componentDoc.node.frontmatter.path);

    return getComponentUrl;
  };

  const renderComponentName = (componentName) => {
    const isUrlAvailable = setComponentUrl(componentName).length > 0;
    console.log({componentName});

    return isUrlAvailable ? (
      <Link to={setComponentUrl(componentName)[0]}>{componentName}</Link>
    ) : (
      componentName
    );
  };
    // Render component row
    const renderComponentRow = allComponents.map((component) => {
      
      const STATUS_BADGE = {
        ready: 'default',
        design: "caution",
        development: "info",
        deprecated: "error",
      }

      return (
        <tr key={component.name} className="statusTable-componentRow">
          <td className="componentRow-name">
            {renderComponentName(component.name)}
          </td>
          <td
            className="componentRow-status"
          >
            {component.lastUpdated}
          </td>

          <td
            className="componentRow-status"
          >
            <Badge type={STATUS_BADGE[component.status]}> 
      {(component.status === 'development' || component.status ===  'design') ? `In ${component.status}` : toTitleCase(component.status)}
            </Badge>
          </td>
        </tr>
      );
    });

  return (
    <table className="statusTable">
      <tbody>
        <tr className="statusTable-headerRow">
          <th>Component</th>
          <th>Last Updated</th>
          <th>Status</th>
        </tr>
        {renderComponentRow}
      </tbody>
    </table>
  )
}


StatusTable.propTypes = {
  // of: PropTypes.string.isRequired,
};

