import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import {MDXRenderer}  from 'gatsby-plugin-mdx';

const BasicLayout = ({ data }) => {
    return (
      <Layout>
        <h1>{data.mdx.frontmatter.title}</h1>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </Layout>
    )
};



export const query = graphql`
  query($pathSlug: String) {
    mdx(frontmatter: { path: { eq: $pathSlug } }) {
      id
      body
      frontmatter {
        title
        path
        category
        blurb
      }
  }
}`;



export default BasicLayout;