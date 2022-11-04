/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from 'components/select';
import React from 'react';

import style from './select.stories.module.scss';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => {
  const [selectedOption, setSelectedOption] = React.useState(null);

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'Smoke', label: 'Smoke' },
    { value: 'Dazy', label: 'Dazy' },
  ];
  return (
    <>
      <Select {...args} value={selectedOption} onChange={setSelectedOption}>
        {options?.map((ele: any) => (
          <option key={ele.value} value={ele.value}>
            {ele.label}
          </option>
        ))}
      </Select>
    </>
  );
};

export const Select_Option: any = Template.bind({});
Select_Option.args = {
  label: 'Please Select',
  disable: false,
  errorMessage: '',
};
