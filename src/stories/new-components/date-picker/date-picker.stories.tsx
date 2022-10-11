import { useForm } from 'react-hook-form';

import DatePicker from 'my-components/date-picker';

export default {
  title: 'DatePicker',
  component: DatePicker,
  argTypes: { handleClick: { action: 'Please Check Me' } },
};

const Template = (args: any) => {
  const { control } = useForm();

  return <DatePicker {...args} control={control} />;
};

export const Datepicker: any = Template.bind({});
Datepicker.args = {
  label: 'Date Picker',
  name: 'Select',
  errorMessage: '',
  placeholder: 'Please Date Picker',
  id: 'hello',
};
