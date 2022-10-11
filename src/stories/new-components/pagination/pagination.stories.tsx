import Pagination from 'new-components/pagination';

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
export const Paginationn: any = Template.bind({});
Paginationn.args = {};
