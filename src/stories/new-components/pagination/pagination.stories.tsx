import Pagination from 'components/pagination';

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
