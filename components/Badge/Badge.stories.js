import React from 'react';
// import { action } from '@storybook/addon-actions';
import Badge from '.';

export default {
  title: 'Badge',
  component: Badge,
};
export const Default = () => <Badge type="default">Default</Badge>;
export const Error = () => <Badge type="error">Error</Badge>;
export const Caution = () => <Badge type="caution">Caution</Badge>;
export const Info = () => <Badge type="info">Info</Badge>;

