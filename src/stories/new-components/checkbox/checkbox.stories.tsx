import Checkbox from 'components/checkbox';

import style from './checkbox.stories.module.scss';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: { handleChange: { action: 'Please Check Me' } },
};

const Template = (args) => <Checkbox {...args} />;

export const CheckBox = Template.bind({});
CheckBox.args = {
  label: 'check me',
  checked: '',
  containerClass: style.containerClass,
  name: 'hiiii',
  labelClass: style.labelClass,
  labelColor: style.labelColor,
};
