import Button from 'new-components/button';
import eye from '../../../new-assets/add.svg';

import style from './button.stories.module.scss';

export default {
  title: 'Button',
  component: Button,
  argTypes: { handleClick: { action: 'Please Click Me' } },
};

const Template = (args) => <Button {...args} />;

export const SimpleButton = Template.bind({});
SimpleButton.args = {
  text: 'Button',
  type: 'button' || 'submit' || 'reset' || undefined,
  isLoading: false,
  btnClass: style.button,
  disabled: false,
  backgroundColor: '#57B894',
  className: style.className,
};

export const LeftIconButton = Template.bind({});
LeftIconButton.args = {
  text: 'Left Icon Button',
  type: 'button' || 'submit' || 'reset' || undefined,
  isLoading: false,
  iconStart: eye,
  btnClass: style.button,
  disabled: false,
  backgroundColor: '#57B894',
  className: style.className,
};

export const RightIconButton = Template.bind({});
RightIconButton.args = {
  text: 'Right Icon Button',
  type: 'button' || 'submit' || 'reset' || undefined,
  isLoading: false,
  iconEnd: eye,
  btnClass: style.button,
  disabled: false,
  backgroundColor: '#57B894',
  className: style.className,
};

export const ButtonWithBorder = Template.bind({});
ButtonWithBorder.args = {
  text: 'Back',
  type: 'button' || 'submit' || 'reset' || undefined,
  isLoading: false,
  btnClass: style.button,
  disabled: false,
  backgroundColor: '#727272',
  border: '2px solid #57B894',
  className: style.text,
};
