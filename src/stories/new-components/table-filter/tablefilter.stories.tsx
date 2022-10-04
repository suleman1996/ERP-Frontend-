import TableFilter from 'new-components/table-filter';

// import style from './timepicker.stories.module.scss';

export default {
  title: 'TableFilter',
  component: TableFilter,
  argTypes: {},
};

const Template = (args: any) => {
  return (
    <>
      <TableFilter {...args} />
    </>
  );
};
export const tableFilterr = Template.bind({});
tableFilterr.args = {};
