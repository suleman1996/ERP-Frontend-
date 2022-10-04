/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from 'new-components/select';

import style from './select.stories.module.scss';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  return (
    <>
      <Select {...args} />
    </>
  );
};

const options = ['option 1', 'option 2', 'option 3'];

export const Selectt = Template.bind({});
Selectt.args = {
  label: 'Please Select',
  children: (
    <>
      {options.map((ele, index) => (
        <option key={index}>{ele}</option>
      ))}
    </>
  ),
  name: 'jahdadkank',
  disable: false,
  errorMessage: '',
};
