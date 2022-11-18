import FiltersComponent from 'components/filters';
import { useState } from 'react';

export default {
  title: 'Filter',
  component: FiltersComponent,
  argTypes: {},
};

const Filter = (args: any) => {
  return (
    <>
      <FiltersComponent />
    </>
  );
};
export const Filters: any = Filter.bind({});
