import Radio from 'my-components/radio';
import React from 'react';

import style from './radio.stories.module.scss';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => {
  const [gender, setGender] = React.useState();
  return (
    <>
      <Radio {...args} handleChange={(e) => setGender(e.target.value)} />
    </>
  );
};

export const Radioo: any = Template.bind({});
Radioo.args = {
  Firstname: 'Male',
  Secondname: 'Female',
  name: 'gender',
  radioValue: 'Male',
  radioValue2: 'Female',
};
