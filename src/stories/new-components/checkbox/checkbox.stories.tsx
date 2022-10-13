import Checkbox from 'my-components/check-box';

import style from './checkbox.stories.module.scss';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
    handleChange: { action: 'true' },
  },
};

const Template = (args: any) => <Checkbox {...args} />;

export const CheckBox: any = Template.bind({});
CheckBox.args = {
  label: 'check me',
  containerClass: style.containerClass,
  textColor: '',
};
