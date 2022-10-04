import DatePicker from 'new-components/date-picker';
import { useForm } from 'react-hook-form';

// import style from './app-loader.stories.module.scss';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: { handleClick: { action: 'Please Check Me' } },
};

const Template = (args) => {
  const { control } = useForm();

  return <DatePicker {...args} control={control} />;
};

export const Datepicker = Template.bind({});
Datepicker.args = {
  label: 'Date Picker',
  name: 'Select',
  errorMessage: '',
  placeholder: 'Please Date Picker',
};
