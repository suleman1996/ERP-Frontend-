import SearchSelect from 'new-components/search-select';
import { useForm } from 'react-hook-form';
import arrow from 'new-assets/arrow-left.svg';

// import style from './timepicker.stories.module.scss';

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

export const Search_Select = Template.bind({});
Search_Select.args = {
  label: 'Seacrh Select',
  placeholder: 'Please Select',
  errorMessage: '',
  name: '',
  icons: arrow,
  options,
};
