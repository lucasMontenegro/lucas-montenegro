import React from 'react';
import FilterLink from './FilterLink';
import { actions } from './state';

const { VisibilityFilters: VFilters } = actions;

export const PureFooter = () => (
  <p>
    Show: <FilterLink filter={VFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={VFilters.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={VFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default PureFooter;
