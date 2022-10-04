import Radio from 'new-components/radio';

import style from './radio.stories.module.scss';

export default {
  title: 'Radio',
  component: Radio,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args: any) => {
  return (
    <>
      <Radio {...args} />
    </>
  );
};

export const Radioo = Template.bind({});
Radioo.args = {
  label: 'Radio',
  name: 'Enter Your Name',
  checked: false,
  radioValue: 'number' || 'string',
  error: false,
  className: style.labelContainer,
  handleChange: () => alert('handle change'),
};
