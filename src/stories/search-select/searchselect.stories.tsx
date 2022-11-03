import { useForm } from 'react-hook-form';

import SearchSelect from 'components/search-select';

import arrow from 'assets/arrow-left.svg';

export default {
  title: 'SearchSelect',
  component: SearchSelect,
  argTypes: {
    handleDelete: { action: 'Handle Delete' },
    handleEdit: { action: 'Handle Edit' },
  },
};

const Template = (args: any) => {
  const { control } = useForm();

  return (
    <>
      <SearchSelect {...args} control={control} />
    </>
  );
};

const options = ['search 1', 'search 2', 'search 3'];

export const Search_Select: any = Template.bind({});
Search_Select.args = {
  label: 'Seacrh Select',
  placeholder: 'Please Select',
  errorMessage: '',
  name: '',
  icons: arrow,
  options,
};
