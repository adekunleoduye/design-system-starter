import React from 'react';    
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

import styles from './PropsTable.module.scss';

export const PropsTable = (props) => {

  //  Get all of the component meta data
  const data = useStaticQuery(graphql`
    {
      allComponentMetadata {
        edges {
          node {
            displayName
            composes
            description {
              id
            }
            props {
              name
              docblock
              defaultValue {
                value
                computed
              }
              type {
                name
                value
                raw
              }
              required
            }
          }
        }
      }
    }
  `);

  // Finding docs for current component.
  const getDocsForComponent = (data) => {
    const result = data.allComponentMetadata.edges.find(({ node }) => {
      return node.displayName === props.of;
    });

    if (result) {
      return result.node;
    }
    return null;
  };

  // Variable to get all the props
  const componentProps = getDocsForComponent(data).props;

  // Table row callback function
  const propItem = (prop) => {

    console.log(prop);
    // Getting the component values
    const cpnName = prop.name;
    const cpnType = prop.type.name;
    const cpnRequired = prop.required;
    const cpnDocblock = prop.docblock;
    const cpnDefault = prop.defaultValue === null ? " " : prop.defaultValue.value;
    const cpnProps = (prop.type.value) === null ? null : prop.type.value.map(type => type.value );

    // Returning the row
    return (
      <tr key={prop.name} className={styles.item}>
        <td className={styles.name}>{cpnName}{cpnRequired && "*"}</td>
        <td className={styles.type}>{cpnType}</td>
        <td className={styles.props}>{cpnProps || cpnDefault}</td>
        <td className={styles.default}>{cpnDefault}</td>
        <td className={styles.type}>{cpnDocblock}</td>
      </tr>
    );
  };

  return (
        <table className={styles.root}>
          <tbody>
          <tr>
            <th>Prop Name</th>
            <th>Type</th>
            <th>Option(s)</th>
            <th>Default Value</th>
            <th>Description</th>
          </tr>
          {componentProps.map(propItem)}
          </tbody>
        </table>
        );
};

PropsTable.propTypes = {
  of: PropTypes.string.isRequired,
};
