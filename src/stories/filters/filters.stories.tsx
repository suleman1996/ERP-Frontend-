import FiltersComponent from 'components/filters';

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
