import Pagination from 'new-components/pagination';

// import style from './timepicker.stories.module.scss';

export default {
  title: 'Pagination',
  component: Pagination,
  argTypes: {},
};

const Template = (args: any) => {
  return (
    <>
      <Pagination {...args} />
    </>
  );
};
export const Paginationn = Template.bind({});
Paginationn.args = {};
