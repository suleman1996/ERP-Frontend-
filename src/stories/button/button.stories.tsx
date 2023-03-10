import Button from 'components/button';

import eye from '../../assets/add.svg';
import leftAroow from '../../assets/arrow-left.svg';
import edit from '../../assets/edit.svg';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    iconStart: {
      options: ['', eye, leftAroow, edit],
      control: { type: 'select' },
    },
    iconEnd: {
      options: ['', eye, leftAroow, edit],
      control: { type: 'select' },
    },
    handleClick: { action: 'Please Click Me' },
  },
};

const Template = (args: any) => <Button {...args} />;

export const SimpleButton: any = Template.bind({});
SimpleButton.args = {
  text: 'Button',
  type: 'button' || 'submit' || 'reset' || undefined,
  isLoading: false,
  backgroundColor: '',
  textColor: 'red',
  borderColor: '',
};
